const jwt = require("jsonwebtoken");
import getConfig from "next/config";

import { apiHandler } from "helpers/api";
import { connectToDatabase } from "data/database";
import { hashPassword } from "helpers/auth";
import { Schema } from "data/Schema";
import { Role } from "services/role";

// users in JSON file for simplicity, store in a db for production application
export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "POST":
      return signup();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function signup() {
    const { email, password, role, address, phone, status, gender, dateBirth } =
      req.body;
    // if (!role) {
    //   role = Role.ADMIN;
    // } else {
    //   if (role != Role.ADMIN && role != Role.MANAGER && role != Role.STAFF) {
    //     throw new Error("Role not invalid permission");
    //   }
    // }
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db();
    const existingUser = await db
      .collection(Schema.USERS)
      .findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(password);
    //    function makeid(length) {
    //     var result           = '';
    //     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     var charactersLength = characters.length;
    //     for ( var i = 0; i < length; i++ ) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }
    //   for(var i = 0;i<10000000;i++){
    //     await db.collection(Schema.USERS).insertOne({
    //       email: makeid(5)+email,
    //       password: hashedPassword,
    //       role: role,
    //       address: address,
    //       status: status,
    //       gender: gender,
    //       active: true,
    //       phone: phone,
    //       dateBirth: dateBirth,
    //       create: new Date(Date.now()).toISOString(),
    //       update: new Date(Date.now()).toISOString(),
    //     });
    //     res.status(201).json({ message: "Created user!",email: email});
    //     client.close();
    //   }
    await db.collection(Schema.USERS).insertOne({
      email: email,
      password: hashedPassword,
      role: role,
      address: address,
      status: status,
      gender: gender,
      active: true,
      phone: phone,
      dateBirth: dateBirth,
      create: new Date(Date.now()).toISOString(),
      update: new Date(Date.now()).toISOString(),
    });
    res.status(201).json({ message: "Created user!", email: email });
    client.close();
  }
}
