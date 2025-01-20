import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
  createdAt: { type: Date, default: Date.now },
});

const Group = mongoose.model("Group", groupSchema);

export { Group };
