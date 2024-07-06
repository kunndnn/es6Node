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

const get = promiseHandler(async (req, res) => {
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
});

const set = promiseHandler(async (req, res) => {
  const { name, email, latitude, longitude } = req.body;
  const location = {
    type: "Point",
    coordinates: [latitude, longitude],
  };

  // console.log({ location, latitude, longitude });

  const { _id } = await new userModel({
    name,
    email,
    location,
  }).save();
  await userCategoryModel.create({ userId: _id, name: Math.random() });
  return res.json({
    success: true,
    message: "your entered successfully",
  });
});

const allUsers = promiseHandler(async (req, res) => {
  const users = await userModel
    .find()
    .select("_id name email")
    .then((users) =>
      users.map((user) => {
        user.name = decryptData(user.name);
        return user;
      })
    )
    .then((users) => {
      users.sort((a, b) => {
        //10 ms
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return users.map((user) => {
        //12 ms
        user.name = encryptData(user.name);
        return user;
      });
    });
  return res.status(200).json(new ApiResponse(200, "all data", users));
});

const nearByUsers = promiseHandler(async (req, res) => {
  const { latitude, longitude } = req.body;
  const distance = 100000, // 10 km radius
    type = "Point",
    coordinates = [latitude, longitude];

  const nearByUsers = await userModel.find({
    location: {
      $near: {
        $geometry: { type, coordinates },
        $maxDistance: distance,
      },
    },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "nearby users", nearByUsers));
});

export { get, set, allUsers, nearByUsers };
