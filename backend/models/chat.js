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
export default mongoose.models.chat || mongoose.model("chat", chatSchema);