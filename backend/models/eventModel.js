import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },
    category: {
      type: [String],
      enum: [
        "music",
        "nightlife",
        "gaming",
        "technology",
        "charity",
        "arts",
        "environments",
      ],
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model("eventModel", eventSchema);

export { eventModel };
