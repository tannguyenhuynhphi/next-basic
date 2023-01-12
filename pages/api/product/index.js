import {
  connectToDatabase,
  countDocuments,
  getAllDocuments,
  getMapItemProduct,
} from "data/database";
import { ProductModel } from "data/model";

import { Schema } from "data/Schema";
import { apiHandler, getFilter } from "helpers";
import { ObjectId } from "mongodb";

export default apiHandler(handler);
function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getProducts();
    case "POST":
      return newProducts();
    case "PUT":
      return updateProducts();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getProducts() {
    var filterWrapper = await getFilter(req);
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      const product = await getMapItemProduct(
        client,
        Schema.PRODUCT,
        filterWrapper.filter,
        filterWrapper.sorters,
        filterWrapper.pages,
        filterWrapper.limits
      );
      function getDataUnNull(product) {
        for (var i = 0; i <= product.length; i++) {
          if (product[i]) {
            return product[i];
          }
        }
      }
      const resp = {
        data: getDataUnNull(product),
        total:
          Object.entries(filterWrapper.filter).length === 0
            ? await countDocuments(client, Schema.PRODUCT)
            : product.length,
      };
      client.close();
      return res.status(200).json(resp);
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Getting event failed." });
    }
  }

  async function newProducts() {
    const { name, detail, imageUrl, active, price, promotion, quantity } =
      req.body;
    if (!name) {
      res.status(422).json({
        message: "Invalid input - characters long.",
      });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db();
    var product = new ProductModel();
    product.setName(name);
    product.setDetail(detail);
    product.setImageUrl(imageUrl);
    product.setActive(active ? active : true);
    product.setPromotion(promotion);
    product.setPrice(price);
    product.setQuantity(quantity);
    product.setDateCreated(new Date().valueOf());
    product.setDateUpdate(new Date().valueOf());
    await db.collection(Schema.PRODUCT).insertOne(product);
    res.status(201).json({ success: product });
    client.close();
  }
  async function updateProducts() {
    const { id, name, detail, imageUrl, active, price, promotion, quantity } =
      req.body;
    if (!id) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db();
    const productCollection = await db.collection(Schema.PRODUCT);
    if (!productCollection) {
      res.status(422).json({ message: "productCollection exists!" });
      client.close();
      return;
    }
    var newValuesSet = {};
    if (name) {
      newValuesSet.name = name;
    }
    if (detail) {
      newValuesSet.detail = detail;
    }
    if (imageUrl) {
      newValuesSet.imageUrl = imageUrl;
    }
    if (active) {
      newValuesSet.active = active;
    }
    if (price) {
      newValuesSet.price = price;
    }
    if (promotion) {
      newValuesSet.promotion = promotion;
    }
    if (quantity) {
      newValuesSet.quantity = quantity;
    }
    newValuesSet.dateUpdate = new Date().valueOf();
    var newValues = {
      $set: newValuesSet,
    };
    try {
      var idObjectId = { _id: ObjectId(id) };
      const result = await productCollection.updateOne(idObjectId, newValues);
      res.status(200).json({ success: result });
      client.close();
    } catch (e) {
      res.status(500).json({ message: "Getting event failed." });
    }
  }
}
