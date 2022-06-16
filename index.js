// IMPORTS FROM PACKAGES
const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");

// IMPORT FROM OTHER FIILES
const config = require("./config");

// INNIT
const { url, name } = config.db;
const PORT = process.env.PORT || 3000;
const app = express();
const DB_URL = `mongodb://${url}/${name}`;

// ROUTES
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// MIDDLEWARE

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

//  => 404 error handle
app.use("*", (req, res) => {
  return res.status(404).json({
    succes: false,
    message: "API endpoint doesn't exist",
  });
});

// CONNECTIONS

//  => Start Mongoose connections block
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect succesfully");
  })
  .catch((error) => {
    console.log(`Error : ${error}`);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongo has connected succesfully");
});

mongoose.connection.on("reconnected", () => {
  console.log("Mongo has reconnected");
});

mongoose.connection.on("error", (error) => {
  console.log("Mongo connection has error", error);
  mongoose.disconnect();
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongo connection has disconnected");
});

//  => End Mongoose connections block

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at ${PORT}`);
});
