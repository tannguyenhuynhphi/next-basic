import { apiHandler } from "helpers/api";
import { connectToDatabase } from "data/database";
import { Schema } from "data/Schema";
import { ObjectId } from "mongodb";
import { hashPassword } from "helpers/auth";

// users in JSON file for simplicity, store in a db for production applications

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "POST":
      return changePass();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  async function changePass() {
    const { _id, newPassword } = req.body;
    if (
      !newPassword ||
      newPassword.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
      return;
    }
    const client = await connectToDatabase();
    const userCollection = client.db().collection(Schema.USERS);
    var idObjectId = { _id: ObjectId(_id) };
    const hashedPassword = await hashPassword(newPassword);
    var newValuesSet = {};
    if (newPassword) {
      newValuesSet.password = hashedPassword;
    }
    newValuesSet.update = new Date(Date.now()).toISOString();
    var newValues = {
      $set: newValuesSet,
    };
    try {
      const result = await userCollection.updateOne(idObjectId, newValues);
      res.status(200).json({ userCollection: result });
      client.close();
    } catch (e) {
      res.status(500).json({ message: "Getting event failed." });
    }
  }
}
