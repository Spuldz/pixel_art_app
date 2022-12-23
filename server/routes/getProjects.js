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

router.post("/", async (req, res) => {
  const collection = client.db("pixel_art").collection("users");
  const id = req.body.id;

  const userData = await collection.findOne({ _id: ObjectId(id) });

  res.json({ projects: userData?.projects });
});

module.exports = router;
