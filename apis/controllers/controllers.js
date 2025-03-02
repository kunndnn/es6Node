import userModel from "#models/users";
import userCategoryModel from "#models/userCategories";
import { promiseHandler } from "#helpers/promiseHandler";
import { ApiResponse } from "#helpers/response";
import { encryptData, decryptData } from "#helpers/hashing";
/**
 * To get the user data with joined to categories.
 * @constructor
 * @param {string} name - The name of the person.
 * @param {email} email - The email of the person.
 */
const get = async (req, res) => {
  try {
    // const data = await userModel.aggregate([
    //   {
    //     $lookup: {
    //       from: "usercategories",
    //       localField: "_id",
    //       foreignField: "userId",
    //       as: "usersData",
    //     },
    //   },
    // ]);
    // const data=await userModel.find().populate('')
    const data = await userCategoryModel.find().populate("userId");
    return res.json({
      success: true,
      message: "your data",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error ${error}`,
    });
  }
};
const set = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { _id } = await userModel.create({
      name,
      email,
    });
    await userCategoryModel.create({ userId: _id, name: Math.random() });
    return res.json({
      success: true,
      message: "your entered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export { get, set };
