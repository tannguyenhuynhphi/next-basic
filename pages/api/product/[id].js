import { connectToDatabase, getAllDocuments } from "data/database";
import { Schema } from "data/Schema";
import { apiHandler } from "helpers/api";
import { ObjectId } from "mongodb";

// users in JSON file for simplicity, store in a db for production applications
export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getProduct();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  async function getProduct() {
    if (!req.query.id) {
      return res.status(500).json({ message: "Getting event failed." });
    }
    var idObjectId = { _id: ObjectId(req.query.id) };
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      const productCollection = client.db().collection(Schema.PRODUCT);
      const product = await productCollection.findOne(idObjectId);
      return res.status(200).json({ data: product,});
    } catch (error) {
      res.status(500).json({ message: "Getting event failed." });
    }
  }
}
