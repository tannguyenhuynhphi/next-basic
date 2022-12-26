import { apiHandler } from "helpers/api";
import { connectToDatabase } from "data/database";
import { Schema } from "data/Schema";
import { Role } from "services/role";
import { ObjectId } from "mongodb";

// users in JSON file for simplicity, store in a db for production applications

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "POST":
      return updateUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function updateUser() {
    const { _id, role } = req.body;
    // if (!role) {
    //   role = Role.ADMIN;
    // } else {
    //   if (role != Role.ADMIN && role != Role.MANAGER && role != Role.STAFF) {
    //     throw new Error("Role not invalid permission");
    //   }
    // }
    if (!_id) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();
    const userCollection = await db.collection(Schema.USERS);
    //   const eventCollection = await db.collection(Schema.USERS).findOne({_id: ObjectId(_id)});
    if (!userCollection) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }
    var newValuesSet = {};
    if (role) {
      newValuesSet.role = role;
    }
    newValuesSet.update = new Date(Date.now()).toISOString();
    var newValues = {
      $set: newValuesSet,
    };
    try {
      var idObjectId = { _id: ObjectId(_id) };
      const result = await userCollection.updateOne(idObjectId, newValues);
      res.status(200).json({ userCollection: result });
      client.close();
    } catch (e) {
      res.status(500).json({ message: "Getting event failed." });
    }
  }


  // async function download(){
  //   try {
  //     await mongoClient.connect();
  
  //     const database = mongoClient.db(dbConfig.database);
  //     const bucket = new GridFSBucket(database, {
  //       bucketName: dbConfig.imgBucket,
  //     });
  
  //     let downloadStream = bucket.openDownloadStreamByName(req.params.name);
  
  //     downloadStream.on("data", function (data) {
  //       return res.status(200).write(data);
  //     });
  
  //     downloadStream.on("error", function (err) {
  //       return res.status(404).send({ message: "Cannot download the Image!" });
  //     });
  
  //     downloadStream.on("end", () => {
  //       return res.end();
  //     });
  //   } catch (error) {
  //     return res.status(500).send({
  //       message: error.message,
  //     });
  //   }
  // };
}
