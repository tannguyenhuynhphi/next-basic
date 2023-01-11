import { connectToDatabase, countDocuments, getAllDocuments, getMapItemProduct } from "data/database";
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
    product.setActive(active?active:true);
    product.setPromotion(promotion);
    product.setPrice(price);
    product.setQuantity(quantity);
    product.setDateCreated(new Date().valueOf());
    product.setDateUpdate(new Date().valueOf());
    await db.collection(Schema.PRODUCT).insertOne(product);
    res.status(201).json({ success: product });
    client.close();
  }
}
