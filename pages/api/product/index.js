import { connectToDatabase, getAllDocuments } from "data/database";
import { ProductModel } from "data/model/product";
import { Schema } from "data/Schema";
import { apiHandler } from "helpers/api";
import { ObjectId } from "mongodb";

export default apiHandler(handler);
function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getProducts();
    case "POST":
      return newProducts();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getProducts() {
    var cust = new ProductModel(12, "Tom", "New Jersey", "234987");
    console.log(cust);
  }
  async function newProducts() {
    const {
      name,
      detail,
      imageUrl,
      active,
      price,
      promotion,
      quantity,
    } = req.body;
    if (!name) {
      res.status(422).json({
        message: "Invalid input - characters long.",
      });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db();
    const post = {
      name: name,
      detail: detail,
      imageUrl: imageUrl,
      active: active,
      price: price,
      promotion: promotion,
      quantity: quantity,
      dateCreated: new Date().valueOf(),
      dateUpdate: new Date().valueOf(),
    };
    await db.collection(Schema.PRODUCT).insertOne(post);
    res.status(201).json({ success: post });
    client.close();
  }
}
