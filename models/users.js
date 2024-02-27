import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    // Define your schema fields and their types
    name: { type: String, required: true },
    email: { type: String, default: "defaultValue" },
    // Add more fields as needed
  },
  { timestamps: true }
);
const userModel = model("users", userSchema);
// export { userModel };
export default userModel;
// const userModel = mongoose.model("users", userSchema);
