const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/routes");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://shubham108h:LOhyTHS7kcSijNsz@cluster0.ovhwygy.mongodb.net/shubham108h",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("mongoDb is connected..."))
  .catch((err) => console.log(err));

app.use("/",route);

const port = 3000;
app.listen(port, function () {
  console.log(`Express app is connected ${port}`);
});
