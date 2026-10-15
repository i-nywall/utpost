import type { TourLog, TourWithRelations } from "@utpost/shared"
import { postgresPool } from "./postgres.js"
import { mongo, toursCollection } from "./mongo.js"
import { BSON } from "mongodb"

const tourId = Number(process.argv[2] ?? 1)
const run = async () => {
  const tour = (await postgresPool.query<TourWithRelations>('select * from tours where id = $1', [tourId])).rows[0]
  if (!tour) throw new Error(`Ingen tur med id ${tourId} i postgres - kör npm run seed först`);
  const logs = (await postgresPool.query<TourLog>("select * from tour_logs where tour_id = $1 order by recorded_at", [tourId])).rows;


  // undecided if we are going to use this structure, just copying it from the demo
  const tourDocument = {
    tour_id: tour.id, // id from postgres, kept until migration is done just to be safe
    guide_id: tour.guide_id,
    title: tour.title,
    started_at: tour.started_at,
    distance_m: tour.distance_m,
    notes: tour.notes,
    logs: logs.map((log) => ({
      t: log.recorded_at,
      lat: log.lat,
      lon: log.lon,
      elevation_m: log.elevation_m,
      heart_rate: log.heart_rate,
      note: log.note,
    })),
    stats: { points: logs.length }
  }

  await mongo.connect();
  const tours = toursCollection();
  await tours.createIndex({ tour_id: 1 }, { unique: true })
  await tours.replaceOne({ tour_id: tour.id }, tourDocument, { upsert: true })

  const readBack = await tours.findOne({ tour_id: tour.id }, { projection: { logs: { $slice: 2 } } });
  console.log(`Postgres: 1 rad i tours + ${logs.length} rader i tour_logs`);
  console.log(`MongoDB:  1 dokument, ${(BSON.calculateObjectSize(tourDocument) / 1024).toFixed(1)} kB`);
  console.log(`Dokument i collectionen tours: ${await tours.countDocuments()}`);
  console.log(JSON.stringify(readBack, null, 2));

  await mongo.close();
  await postgresPool.end();
};

run().catch((err) =>{
  console.error(err.message);
  process.exit(1)
})
