// Run express
const Chat = require("./models/chat");
require("dotenv").config();
const UserChats = require("./models/userChats");
const express = require("express");
const Imagekit = require("imagekit");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const PORT = process.env.port || 3000;
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("db connected");
  } catch (error) {
    console.log("mongodb error", error);
  }
};

// const imagekit = new Imagekit({
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
// });

app.use(
  cors({
    url: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/upload", (req, res) => {
  //  {token, signature,expiry} as response
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// fetch all user chats
app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.findOne({ userId });
    console.log(userChats, "fetch chats ");
    res.status(200).send(userChats.chats);
  } catch (error) {
    console.log(error);
    res.status(500).send("error fetching chat");
  }
});

app.get("/api/test", ClerkExpressRequireAuth(), async (req, res) => {
  console.log("success");
  res.send("success");
});

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;
  console.log(text);

  try {
    // create new chat
    const newChat = new Chat({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text: text }],
        },
      ],
    });

    // mongodb creates _id
    const savedChat = await newChat.save();

    // check if the user exists, if yes, push the chat
    const userChats = await UserChats.find({ userId: userId });

    if (!userChats.length) {
      console.log("Creating new user chats...");
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
    } else {
      // if exists, push to existing array
      console.log("Updating the existing user chats...");
      await UserChats.updateOne(
        { userId: userId }, // filter using id then push to that array
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
    }
    res.status(201).send(newChat._id);
  } catch (error) {
    console.log(error);
    res.status(500).send("error creating chat");
  }
});

// clerk auth
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});
app.listen(PORT, () => {
  connect();
  console.log("server is running!");
});
