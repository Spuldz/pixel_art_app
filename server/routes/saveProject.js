const express = require("express");
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://mongo:roliks112@cluster0.glurndi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("pixel_art").collection("users");
});

router.post("/", (req, res) => {
  const body = req.body;
  const colorArray = body.colorArray;
  const id = body.id;

  const collection = client.db("pixel_art").collection("users");

  collection.updateOne(
    { _id: ObjectId(id) },
    {
      $push: {
        projects: { colorArray: body.colorArray },
      },
    },
    {
      upsert: true,
    }
  );

  res.json({ colorArray: colorArray, account: id });
});

module.exports = router;
