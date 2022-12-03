import expressAsyncHandler from "express-async-handler";

import User from "../models/User.model.js";
import {
  handleCreate,
  handleGetSingle,
  handleDelete,
  handleCreateUser
} from "../helpers/baseHelpers.js";
import passwordGenerator from "../utils/generatePassword.js";
import { findUserByEmail, isCorrectPassword, generateToken} from "../helpers/userHelper.js";

// @desc Register a new user
// @route /api/v1/users/register
// @access Public 
const httpRegisterUser = async (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body;
const userExist = await findUserByEmail(email)
    if (userExist) {
      return res.status(400).json({ status: "Fail", message: `Email ${email} is already in our system` });
    }
  const hashedPassword = await passwordGenerator(password);

  const newUser = {
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    role,
  };

  handleCreateUser(User, newUser, res);
};

// @desc Login a new user
// @route /api/v1/users/login
// @access Public 
const httpLoginUser = expressAsyncHandler(async (req, res) => {

  const userInfo = req.body
  const foundUser = await findUserByEmail(userInfo.email)

  // role: foundUser.role, we should also include this in res
  if (await isCorrectPassword(foundUser, userInfo)) {
      res.status(200).json({
          _id: foundUser._id,
          email: foundUser.email,
          lastName: foundUser.lastName,
          firstName: foundUser.firstName,
          role: foundUser.role,
          token: generateToken(foundUser)
      })
  } else {
      res.status(401).json({message: 'Invalid credentials'});
  }
})

// @desc Get all users
// @route /api/v1/users/
const httpGetAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password").sort({ firstName: 1 });
   (users) ? res.status(200).json(users) : res.status(200).json({message:"Internal server error"});
};

// @desc Get a user by Id
// @route /api/v1/users/Id
const httpGetUser = async (req, res) => {
  const { id } = req.params;
  const user = await handleGetSingle(User, id);

   (!user) ? res.status(404).json({ status: "Fail", message: "User Not Found!" })
    : res.status(200).json(user);
};

// @desc update a users
// @route /api/v1/users/Id
const httpUpdateUser = () => {};

// @desc delete a user
// @route /api/v1/users/Id
const httpDeleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await handleGetSingle(User, id);
  if (!user) {
    return res.status(400).json({status: "Fail", message: "Invalid user id"})
  }
  const isDeleted = await handleDelete(User, id)
  if(isDeleted.acknowledged)  res.status(200).json({message: `User with ${user.email} removed successfully`});
};

export {
  httpRegisterUser,
  httpGetAllUsers,
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
  httpLoginUser
};
