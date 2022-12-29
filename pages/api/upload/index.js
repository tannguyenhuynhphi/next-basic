const upload = require("./../../../middleware/upload");
import { connectToDatabase } from "data/database";
import getConfig from "next/config";
// const GridFSBucket = require("mongodb").GridFSBucket;
import { apiHandler } from "helpers/api";

const { publicRuntimeConfig } = getConfig();
export default apiHandler(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
function handler(req, res) {
  switch (req.method) {
    case "POST":
      return uploadFiles();
    case "GET":
      return getListFiles();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function uploadFiles() {
    try {
      await upload(req, res);

      if (req.files.length <= 0) {
        return res
          .status(400)
          .send({ message: "You must select at least 1 file." });
      }

      return res.status(200).send({
        message: "Files have been uploaded.",
      });

    } catch (error) {
      console.log(error);

      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).send({
          message: "Too many files to upload.",
        });
      }
      return res.status(500).send({
        message: `Error when trying upload many files: ${error}`,
      });

      // return res.send({
      //   message: "Error when trying upload image: ${error}",
      // });
    }
  }

  async function getListFiles() {
    try {
      const client = await connectToDatabase();
      const db = client.db();
      const images = db.collection("photo" + ".files")
      
      const cursor = images.find({});
      if ((await cursor.count()) === 0) {
        return res.status(500).send({
          message: "No files found!",
        });
      }
      let fileInfos = [];
      await cursor.forEach((doc) => {
        fileInfos.push({
          name: doc.filename,
          url: publicRuntimeConfig.baseUrl + doc.filename,
        });
      });

      return res.status(200).send(fileInfos);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }
}

// const getListFiles = async (req, res) => {
//   try {
//     await mongoClient.connect();

//     const database = mongoClient.db(dbConfig.database);
//     const images = database.collection(dbConfig.imgBucket + ".files");

//     const cursor = images.find({});

//     if ((await cursor.count()) === 0) {
//       return res.status(500).send({
//         message: "No files found!",
//       });
//     }

//     let fileInfos = [];
//     await cursor.forEach((doc) => {
//       fileInfos.push({
//         name: doc.filename,
//         url: baseUrl + doc.filename,
//       });
//     });

//     return res.status(200).send(fileInfos);
//   } catch (error) {
//     return res.status(500).send({
//       message: error.message,
//     });
//   }
// };

// const download = async (req, res) => {
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

// module.exports = {
//   uploadFiles,
//   getListFiles,
//   download,
// };
