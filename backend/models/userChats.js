const mongoose = require("mongoose");

const userChatsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  chats: [
    {
      _id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  ],
});

// Check in the db model or create a new one
const UserChats =
  mongoose.models.UserChats || mongoose.model("UserChats", userChatsSchema);

module.exports = UserChats;
