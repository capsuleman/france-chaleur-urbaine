import {
  exportPolygonSummary,
  getLineSummary,
  getPolygonSummary,
} from '@core/infrastructure/repository/dataSummary';
import turfArea from '@turf/area';
import { lineString, polygon } from '@turf/helpers';
import turfLength from '@turf/length';
import { NextApiRequest, NextApiResponse } from 'next';
import { withCors } from 'src/services/api/cors';
import { EXPORT_FORMAT } from 'src/types/enum/ExportFormat';

const polygonSummary = async (
  coordinates: number[][],
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const size = turfArea(polygon([coordinates]));
  if (size > 5_000_000) {
    return res
      .status(400)
      .send('Cannot compute stats on area bigger than 5 km²');
  }
  if (req.method === 'GET') {
    const data = await getPolygonSummary(coordinates);
    return res.json(data);
  } else if (req.method === 'POST') {
    const format = req.query.format as EXPORT_FORMAT;
    if (!Object.values(EXPORT_FORMAT).includes(format)) {
      return res.status(400).json({
        message: `Parameter format is required and must be one of "${Object.values(
          EXPORT_FORMAT
        ).join()}"`,
        code: 'Bad Arguments',
      });
    }

    const data = await exportPolygonSummary(coordinates, format);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${data.name}`);

    return res.send(data.content);
  }

  return res.status(501);
};

const lineSummary = async (
  coordinates: number[][][],
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    const size = coordinates.reduce(
      (acc, value) => acc + turfLength(lineString(value)),
      0
    );
    const summaries = await Promise.all(
      coordinates.map((coordinate) => getLineSummary(coordinate))
    );
    const data = summaries.reduce(
      (acc, value) => {
        return {
          '10': acc['10']
            .concat(value['10'])
            .filter(
              (value, index, array) =>
                array.findIndex((v) => v.rownum === value.rownum) === index
            ),
          '50': acc['50']
            .concat(value['50'])
            .filter(
              (value, index, array) =>
                array.findIndex((v) => v.rownum === value.rownum) === index
            ),
        };
      },
      { '10': [], '50': [] } as { '10': any[]; '50': any[] }
    );
    return res.json({ size, data });
  }

  return res.status(501);
};

const summary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const coordinates = JSON.parse(
      decodeURIComponent((req.query as Record<string, string>).coordinates)
    );

    const type = req.query.type as string;

    if (!coordinates || !type) {
      return res.status(400).json({
        message: 'Parameters coordinates and type are required',
        code: 'Bad Arguments',
      });
    }
    if (type === 'polygon') {
      await polygonSummary(coordinates, req, res);
    } else if (type === 'line') {
      await lineSummary(coordinates, req, res);
    } else {
      return res.status(400).json({
        message: 'Invalid type, should be line or polygon',
        code: 'Bad Arguments',
      });
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    return res.json({
      message: 'internal server error',
      code: 'Internal Server Error',
    });
  }
};

export default withCors(summary);
