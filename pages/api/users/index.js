import { connectToDatabase, getAllDocuments } from "data/database";
import { Schema } from "data/Schema";
import { apiHandler } from "helpers/api";

// users in JSON file for simplicity, store in a db for production applications
export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getUsers();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUsers() {
    // return users without passwords in the response
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      const users = await getAllDocuments(client, Schema.USERS, { _id: -1 },0 ,10);
      const response = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Getting event failed." });
    }
  }
}
