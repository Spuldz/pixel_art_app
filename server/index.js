const express = require("express");
const cors = require("cors");
const registerRouter = require("./routes/register");
const accountInfoRouter = require("./routes/accountInfo");
const saveProjectRouter = require("./routes/saveProject");
const getProjectsRouter = require("./routes/getProjects");
const saveRouter = require("./routes/save");

const PORT = 5000;
let account = null;

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

const app = express();
app.use(cors());
app.use(express.json());

//routers
app.use("/register", registerRouter);
app.use("/accountInfo", accountInfoRouter);
app.use("/saveProject", saveProjectRouter);
app.use("/get-projects", getProjectsRouter);
app.use("/save", saveRouter);

app.get("/users", async (req, res) => {
  const collection = client.db("pixel_art").collection("users");
  const agg = await collection.aggregate([]).toArray();

  res.json({ users: agg, account: account });
});

app.get("/loggedInUser", (req, res) => {
  res.json({ account: account });
});

app.post("/users", async (req, res) => {
  const body = req.body;

  const collection = client.db("pixel_art").collection("users");
  const users = await collection.aggregate([]).toArray();

  users.map((user) => {
    if (user.username === body.username && user.password === body.password) {
      res.json({ loggedInAccount: user._id });
      account = user._id;
    }
  });
});

app.get("/logout", (req, res) => {
  account = null;

  res.json({ account: account });
});

app.listen(PORT, () => console.log("listening on port: ", PORT));
