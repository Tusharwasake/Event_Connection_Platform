import mongoose from "mongoose";

const lobbyEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "userModel",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "eventModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const lobbyModel = mongoose.model("lobbyModel", lobbyEventSchema);

export { lobbyModel };
