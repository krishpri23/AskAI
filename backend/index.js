// Run express
const express = require("express");
const Imagekit = require("imagekit");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const PORT = process.env.port || 3000;
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("db connected");
  } catch (error) {}
};

const imagekit = new Imagekit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

app.use(
  cors({
    url: "http://localhost:5173/",
  })
);
app.get("/api/upload", (req, res) => {
  //  {token, signature,expiry} as response
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(PORT, () => {
  connect();
  console.log("server is running!");
});
