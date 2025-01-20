import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: 250,
    },
    hobbies: {
      type: [String],
      default: [],
    },
    socialLinks: {
      type: [String],
      default: [],
    },
    picture: {
      type: String,
    },
    visibilty: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const profile = mongoose.model("profile", profileSchema);
export { profile };
