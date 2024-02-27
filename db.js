import mongoose from "mongoose";
const connect = () => {
  mongoose
    .connect(`mongodb://localhost:27017/test`)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
export { connect };
