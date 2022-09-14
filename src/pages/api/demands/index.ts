import { getSpreadSheet } from '@core/infrastructure/repository/export';
import { getDemands } from '@core/infrastructure/repository/manager';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { displayModeDeChauffage } from 'src/services/Map/businessRules/demands';
import { EXPORT_FORMAT } from 'src/types/enum/ExportFormat';
import { ExportColumn } from 'src/types/ExportColumn';
import { Demand } from 'src/types/Summary/Demand';

const exportColumn: ExportColumn<Demand>[] = [
  {
    header: 'Statut',
    value: 'Status',
  },
  {
    header: 'Prospect recontacté',
    value: (demand) => (demand['Prise de contact'] ? 'Oui' : 'Non'),
  },
  {
    header: 'Nom',
    value: (demand) => `${demand.Prénom ? demand.Prénom : ''} ${demand.Nom}`,
  },
  { header: 'Mail', value: 'Mail' },
  { header: 'Adresse', value: 'Adresse' },
  {
    header: 'En ZDP',
    value: (demand) => (demand['Prise de contact'] ? 'Oui' : 'Non'),
  },
  { header: 'Date de demande', value: 'Date demandes' },
  { header: 'Type de chauffage', value: 'Structure' },
  {
    header: 'Mode de chauffage',
    value: (demand) => displayModeDeChauffage(demand),
  },
  { header: 'Distance au réseau', value: 'Distance au réseau' },
  { header: 'Nb logements', value: 'Logement' },
  { header: 'Conso gaz', value: 'Conso' },
  { header: 'Commentaires', value: 'Commentaire' },
];

const get = async (res: NextApiResponse, email: string) => {
  const demands = await getDemands(email);
  return res.status(200).json(demands);
};

const post = async (res: NextApiResponse, email: string) => {
  const demands = await getDemands(email);
  if (!demands) {
    return res.status(204).send(null);
  }

  const csv = getSpreadSheet(exportColumn, demands, EXPORT_FORMAT.CSV);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=demands_fcu.csv`);

  return res.status(200).send(csv);
};

export default async function demands(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    const email = session?.user?.email;
    if (!email) {
      return res.status(204).json([]);
    }

    if (req.method === 'GET') {
      return get(res, email);
    }

    if (req.method === 'POST') {
      return post(res, email);
    }
    return res.status(501);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    return res.json({
      message: 'internal server error',
      code: 'Internal Server Error',
    });
  }
}