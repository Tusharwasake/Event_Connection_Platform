import mongoose from "mongoose";

const participantSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "eventModel",
    required: true,
  },
  phone: {
    type: String,
  },
  code: {
    type: Number,
    unique: true,
    required: true,
  },
});

const participantModel = mongoose.model("participantModel", participantSchema);

export { participantModel };
