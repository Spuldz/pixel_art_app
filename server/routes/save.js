const express = require("express");
const router = express.Router();

let SAVE;

router.post("/", (req, res) => {
  const body = req.body;

  SAVE = body.save;

  res.status(200);
});

router.get("/", (req, res) => {
  res.json({ save: SAVE });
});

module.exports = router;
