import mongoose from "mongoose";
const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb://localhost:27017/test`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};
export { connect };
