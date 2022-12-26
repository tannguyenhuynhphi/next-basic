const jwt = require("jsonwebtoken");
import getConfig from "next/config";
import { apiHandler } from "helpers/api";
import { connectToDatabase } from "data/database";
import { Schema } from "data/Schema";
import { verifyPassword } from "helpers/auth";

const { serverRuntimeConfig } = getConfig();
// users in JSON file for simplicity, store in a db for production applications
export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "POST":
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    const { email, password } = req.body;
    const client = await connectToDatabase();
    const db = client.db();
    const existingUser = await db
      .collection(Schema.USERS)
      .findOne({ email: email });
    if (!existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }
    const isValid = await verifyPassword(password, existingUser.password);
    if (!isValid) {
      client.close();
      throw new Error("Could not log you in!");
    }
    const token = jwt.sign(
      {
        sub: {
          id: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
          create: existingUser.create,
          update: existingUser.update,
        },
      },
      serverRuntimeConfig.secret,
      {
        expiresIn: "1d",
      }
    );
    client.close();
    // return basic user details and token
    return res.status(200).json({
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
      create: existingUser.create,
      update: existingUser.update,
      token,
    });
  }
}
