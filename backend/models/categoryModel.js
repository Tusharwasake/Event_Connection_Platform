import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

categoryModel = mongoose.model("categoryModel", categorySchema);

export { categoryModel };
