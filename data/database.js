import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  if ( process.env.NODE_ENV === "development") {
    const client = await MongoClient.connect("mongodb://localhost:27017/next-app");
    return client;
  } else {
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.z0kda.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(connectionString);
    return client;
  }
}
export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, skip, limit) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).skip(skip).limit(limit).toArray();
  return documents;
}
