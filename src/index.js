require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/route");

const app = express();
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose
  .connect(
    process.env.DB,
   
  )
  .then(() => console.log("MongoDB Running"))
  .catch((err) => console.log(err));

app.use("/", route);

app.use("/*", function (req, res) {
  return res.status(400).send({ status: false, msg: "invalid routing path" });
});

app.listen(process.env.port||3000, () => {
  console.log("Express Running on " + process.env.port || 3000);
});
