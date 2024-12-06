// Run express
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Chat = require("./models/chat");
const UserChats = require("./models/userChats");
const Imagekit = require("imagekit");

const { default: mongoose } = require("mongoose");
const {
  ClerkExpressRequireAuth,
  requireAuth,
} = require("@clerk/clerk-sdk-node");

const PORT = process.env.URL_PROD || 3000;
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("db connected");
  } catch (error) {
    console.log("mongodb error", error);
  }
};

//initialize imageKit
const imagekit = new Imagekit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

app.use(
  cors({
    url: process.env.URL_PROD, 
    credentials: true,
  })
);
app.use(express.json());

app.use(requireAuth());

// image upload
app.get("/api/upload", (req, res) => {
  //  {token, signature,expiry} as response
  const result = imagekit.getAuthenticationParameters();
  console.log("result from imagekit", result);
  res.send(result);
});


// fetch all user chats
app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  console.log( req.auth, "Clerk Auth");

  try {
    const userChats = await UserChats.findOne({ userId });
    console.log("fetched user chats ");
    res.status(200).send(userChats ? userChats.chats : []);
  } catch (error) {
    console.log(error);
    res.status(500).send("error fetching chat");
  }
});

// fetch single chat
app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    console.log("fetched single chat...");
    res.status(200).send(chat ? chat : []);
  } catch (error) {
    console.log(error);
    res.status(500).send("error fetching single chat");
  }
});

// POST
app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  console.log(userId, "USER ID from backend");

  const { text } = req.body;

  console.log(text, "TEXT");

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
    console.log("saving chat");

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
      // respond the id for first chat message
      res.status(201).send(newUserChats._id.toString());
    } else {
      // if exists, push to existing array
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

      console.log("New user chat created!! ");
      // Responds with chatID to open on new page
      // res.status(201).send(newChat._id); //throws error as _id is sent as ObjectId("")

      res.status(201).json({ chatId: savedChat._id.toString() }); // 201 new resource created
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("error creating chat");
  }
});

// * PUT - update existing chat
app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  const { question, answer, img } = req.body;
  console.log("img from updating chat", img);

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).json({ chats: updatedChat });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation!");
  }
});

// clerk auth
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});
app.listen(PORT, () => {
  connect();
  console.log(`server is running on  ${PORT}`);
});
