import db from 'src/db';

const isInZDP = async (lat: number, lon: number): Promise<boolean> => {
  const zdp = await db('zone_de_developpement_prioritaire')
    .select('id')
    .where(
      db.raw(`ST_WITHIN(
    ST_Transform('SRID=4326;POINT(${lon} ${lat})'::geometry, 2154),
    ST_Transform(geom, 2154)
  )`)
    )
    .first();

  return zdp !== undefined;
};

export default isInZDP;
