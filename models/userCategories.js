import { Schema, model } from "mongoose";
const { ObjectId } = Schema;
const categorySchema = new Schema(
  {
    userId: { type: ObjectId, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);
export default model("userCategories", categorySchema);
