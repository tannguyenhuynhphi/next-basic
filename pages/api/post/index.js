import { connectToDatabase, getAllDocuments } from "data/database";
import { Schema } from "data/Schema";
import { apiHandler } from "helpers/api";
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
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      const posts = await getAllDocuments(
        client,
        Schema.POSTS,
        { _id: -1 },
        0,
        10
      );
      client.close();
      return res.status(200).json(posts);
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

    // function makeid(length) {
    //   var result = "";
    //   var characters =
    //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //   var charactersLength = characters.length;
    //   for (var i = 0; i < length; i++) {
    //     result += characters.charAt(
    //       Math.floor(Math.random() * charactersLength)
    //     );
    //   }
    //   return result;
    // }
    // for (var i = 0; i < 100; i++) {
    //   const client = await connectToDatabase();
    //   const db = client.db();
    //   const post = {
    //     title: title+makeid(100),
    //     content: content+makeid(1000),
    //     location: location,
    //     image: image+makeid(10),
    //     active: true,
    //     create: create,
    //     dateCreated: new Date(Date.now()).toISOString(),
    //     dateUpdate: new Date(Date.now()).toISOString(),
    //   };
    //   await db.collection(Schema.POSTS).insertOne(post);
    // }

    const client = await connectToDatabase();
    const db = client.db();
    const post = {
      title: title,
      content: content,
      location: location,
      image: image,
      active: true,
      create: create,
      dateCreated: new Date(Date.now()).toISOString(),
      dateUpdate: new Date(Date.now()).toISOString(),
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
