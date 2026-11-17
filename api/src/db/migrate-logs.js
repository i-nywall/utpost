import { postgresPool } from './postgres.js'
import { mongo, toursCollection } from './mongo.js'

const toUnixSeconds = (value) => Math.floor(new Date(value).getTime() / 1000)

let mongoConnected = false

const run = async () => {
  try {
    const { rows: tours } = await postgresPool.query('select * from tours order by id')
    const { rows: logs } = await postgresPool.query(
      'select * from tour_logs order by tour_id, recorded_at',
    )

    const logsByTourId = new Map()

    for (const log of logs) {
      const points = logsByTourId.get(log.tour_id) ?? []
      points.push({
        timestamp: toUnixSeconds(log.recorded_at),
        lat: log.lat,
        lon: log.lon,
        elevation_m: log.elevation_m,
        heart_rate: log.heart_rate,
        note: log.note,
      })
      logsByTourId.set(log.tour_id, points)
    }

    await mongo.connect()
    mongoConnected = true

    const collection = toursCollection()
    await collection.createIndex({ tour_id: 1 }, { unique: true })

    const operations = tours.map((tour) => {
      const points = logsByTourId.get(tour.id) ?? []

      return {
        replaceOne: {
          filter: { tour_id: tour.id },
          replacement: {
            tour_id: tour.id,
            user_id: tour.user_id,
            guide_id: tour.guide_id,
            title: tour.title,
            started_at: toUnixSeconds(tour.started_at),
            distance_m: tour.distance_m,
            notes: tour.notes,
            logs: points,
            stats: { logPoints: points.length },
          },
          upsert: true,
        },
      }
    })

    const result = operations.length
      ? await collection.bulkWrite(operations, { ordered: true })
      : { upsertedCount: 0 }

    const documentCount = await collection.countDocuments()

    console.log(`Postgres: ${tours.length} turer, ${logs.length} mätpunkter`)
    console.log(
      `MongoDB: ${result.upsertedCount} nya dokument, ${tours.length - result.upsertedCount} fanns redan`,
    )
    console.log(`Dokument i collectionen tours: ${documentCount}`)
  } finally {
    if (mongoConnected) await mongo.close()
    await postgresPool.end()
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
