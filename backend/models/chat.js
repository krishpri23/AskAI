const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user", "model"],
          required: true,
        },
        parts: [
          {
            text: {
              type: String,
              required: true,
            },
          },
        ],

        //  can send image in chats
        img: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

// Check in the db model or create a new one
const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
module.exports = Chat;
