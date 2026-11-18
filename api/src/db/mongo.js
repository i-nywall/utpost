import { MongoClient } from 'mongodb'
import { config } from '../config.js'

export const mongo = new MongoClient(config.mongoUrl, { serverSelectionTimeoutMS: 3000 })
export const mongoDB = () => mongo.db()

export const toursCollection = () => mongoDB().collection('tours')

export const loadTourLogs = async (tourId) => {
  const tour = await toursCollection().findOne(
    { tour_id: Number(tourId) },
    { projection: { logs: 1, _id: 0 } },
  )

  return tour?.logs ?? []
}

export const deleteTourDocument = async (tourId) =>
  toursCollection().deleteOne({ tour_id: Number(tourId) })
