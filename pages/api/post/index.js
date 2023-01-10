import {
  connectToDatabase,
  countDocuments,
  getAllDocuments,
  getMapItem,
} from "data/database";
import { Schema } from "data/Schema";
import { apiHandler, getFilter } from "helpers";
import { ObjectId } from "mongodb";

// users in JSON file for simplicity, store in a db for production applications
export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPost();
    case "POST":
      return newPost();
    case "PUT":
      return updatePost();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  //get
  async function getPost() {
    var filterWrapper = await getFilter(req);
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      const posts = await getMapItem(
        client,
        Schema.POSTS,
        filterWrapper.filter,
        filterWrapper.sorters,
        filterWrapper.pages,
        filterWrapper.limits
      );
      function getDataUnNull(posts) {
        for (var i = 0; i <= posts.length; i++) {
          if (posts[i]) {
            return posts[i];
          }
        }
      }
      const resp = {
        data: getDataUnNull(posts),
        total:
          Object.entries(filterWrapper.filter).length === 0
            ? await countDocuments(client, Schema.POSTS)
            : posts.length,
      };
      client.close();
      return res.status(200).json(resp);
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Getting event failed." });
    }
  }
  //add
  async function newPost() {
    const { title, content, location, image, create } = req.body;
    if (!title) {
      res.status(422).json({
        message: "Invalid input - characters long.",
      });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();
    const post = {
      title: title,
      content: content,
      location: location,
      image: image,
      active: true,
      create: create,
      dateCreated: new Date().valueOf(),
      dateUpdate: new Date().valueOf(),
    };
    await db.collection(Schema.POSTS).insertOne(post);
    res.status(201).json({ success: post });
    client.close();
  }

  //update
  async function updatePost() {
    const { _id, title, content, location, image, active } = req.body;
    if (!title) {
      res.status(422).json({
        message: "Invalid input - characters long.",
      });
      return;
    }

    if (!_id) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();
    const postCollection = await db.collection(Schema.POSTS);
    const newValuesSet = {};
    if (title) {
      newValuesSet.title = title;
    }
    if (content) {
      newValuesSet.content = content;
    }
    if (location) {
      newValuesSet.location = location;
    }
    if (image) {
      newValuesSet.image = image;
    }
    if (active) {
      newValuesSet.active = active;
    }
    newValuesSet.dateUpdate = new Date(Date.now()).toISOString();
    var newValues = {
      $set: newValuesSet,
    };
    try {
      var idObjectId = { _id: ObjectId(_id) };
      const result = await postCollection.updateOne(idObjectId, newValues);
      res.status(200).json({ postCollection: result });
      client.close();
    } catch (e) {
      res.status(500).json({ message: "Getting event failed." });
    }
  }
}
