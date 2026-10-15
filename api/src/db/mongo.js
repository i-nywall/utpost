import { MongoClient } from 'mongodb';
import { config } from '../config.js';

export const mongo = new MongoClient(config.mongoUrl, { serverSelectionTimeoutMS: 3000 });
export const mongoDB = () => mongo.db()



// Dokumentmodellen för turer (beslutad i M3, migreringen görs i M5):
// en tur = ett dokument, med mätpunkterna inbäddade i arrayen `logs`.
// Läses alltid ihop, skrivs en gång, ca 300 punkter per tur = ett par tiotal kB.
export const toursCollection = () => mongoDB().collection('tours');