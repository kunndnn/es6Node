import userModel from "../../models/users.js";
import userCategoryModel from "../../models/userCategories.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { ApiResponse } from "../../helpers/response.js";
/**
 * To get the user data with joined to categories.
 * @constructor
 * @param {string} name - The name of the person.
 * @param {email} email - The email of the person.
 */

const get = asyncHandler(async (req, res) => {
  const data = await userModel.aggregate([
    {
      $lookup: {
        from: "usercategories",
        localField: "_id",
        foreignField: "userId",
        as: "usersData",
      },
    },
  ]);
  return res.status(200).json(new ApiResponse(200, "your response", data));
  // return res.json({
  //   success: true,
  //   message: "your data",
  //   data,
  // });
});

const set = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const { _id } = await new userModel({
    name,
    email,
  }).save();
  await new userCategoryModel({ userId: _id, name: Math.random() }).save();
  return res.json({
    success: true,
    message: "your entered successfully",
  });
});
export { get, set };
