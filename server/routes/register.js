const express = require("express");
const router = express.Router();

const { MongoClient, ServerApiVersion } = require("mongodb");
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
  const collection = client.db("pixel_art").collection("users");
  const users = await collection.aggregate([]).toArray();
  let exists = false;

  if (!body.username.length < 3 || !body.password.length < 3) {
    await users.map((user) => {
      if (user.username === body.username) {
        exists = true;
        return;
      } else {
        exists = false;
      }
    });

    if (!exists) {
      await collection.insertOne({
        username: body.username,
        password: body.password,
        projects: [],
      });
    }
  }
});

module.exports = router;
