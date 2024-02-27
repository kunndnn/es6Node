import userModel from "../../models/users.js";
import userCategoryModel from "../../models/userCategories.js";

/**
 * To get the user data with joined to categories.
 * @constructor
 * @param {string} name - The name of the person.
 * @param {email} email - The email of the person.
 */
const get = async (req, res) => {
  try {
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
    const { _id } = await new userModel({
      name,
      email,
    }).save();
    await new userCategoryModel({ userId: _id, name: Math.random() }).save();
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
