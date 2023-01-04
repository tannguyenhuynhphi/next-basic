import { MongoClient, ObjectId } from "mongodb";
import { Schema } from "./Schema";

export async function connectToDatabase() {
  if (process.env.NODE_ENV === "development") {
    const client = await MongoClient.connect(
      "mongodb://127.0.0.1:27017/next-app"
    );
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

export async function getAllDocuments(
  client,
  collection,
  filter,
  sort,
  skip,
  limit
) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();
  return documents;
}

export async function countDocuments(client, collection) {
  const db = client.db();
  const documents = await db.collection(collection).count();
  return documents;
}

export async function filallDocuments(client, collection) {
  const db = client.db();
  const documents = await db.collection(collection).find();
  return documents;
}

// export async function getMapItem(
//   client,
//   collection,
//   filter,
//   sort,
//   skip,
//   limit
// ) {
//   const db = client.db();
//   const post = await db
//     .collection(collection)
//     .aggregate([
//       {
//         $addFields: {
//           create: {
//             $toObjectId: "$create",
//           },
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "create",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//     ])
//     // .find(filter)
//     .sort(sort)
//     .skip(skip)
//     .limit(limit)
//     .toArray();
//   return post;
// }

export async function getMapItem(
  client,
  collection,
  filter,
  sort,
  skip,
  limit
) {
  const db = client.db();
  const post = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();
  const newFriendPosts = [];
  return await Promise.all(
    post.map(async (item) => {
      var idObjectId = { _id: ObjectId(item.create) };
      const { name, _id, email } = await db
        .collection(Schema.USERS)
        .findOne(idObjectId);
      item.userPost = { name, _id, email };
      newFriendPosts.push(item);
      if (post.length === newFriendPosts.length) {
        return newFriendPosts;
      }
    })
  );
}
