import { connectToDatabase } from "data/database";
import { apiHandler } from "helpers/api";
import { GridFSBucket } from "mongodb";
export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return uploadFiles();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function uploadFiles() {
    try {
      const client = await connectToDatabase();
      const database = client.db();

      const bucket = new GridFSBucket(database, {
        bucketName: "photo",
      });
      let downloadStream = bucket.openDownloadStreamByName(req.query.name);

      downloadStream.on("data", function (data) {
        return res.status(200).write(data);
      });

      downloadStream.on("error", function (err) {
        return res.status(404).send({ message: "Cannot download the Image!" });
      });

      downloadStream.on("end", () => {
        return res.end();
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }
}
