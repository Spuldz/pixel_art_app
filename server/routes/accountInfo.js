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
  const body = req.body;
  const db = client.db("pixel_art").collection("users");

  const userData = await db.findOne({ _id: ObjectId(body.id) });

  await res.json({
    username: userData?.username,
    projects: userData?.projects,
  });
});

module.exports = router;
