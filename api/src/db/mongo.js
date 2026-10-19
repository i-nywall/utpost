import { MongoClient } from 'mongodb'
import { config } from '../config.js'

export const mongo = new MongoClient(config.mongoUrl, { serverSelectionTimeoutMS: 3000 })
export const mongoDB = () => mongo.db()

export const toursCollection = () => mongoDB().collection('tours')
