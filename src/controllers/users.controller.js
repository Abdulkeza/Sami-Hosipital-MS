import User from "../models/User.js";
import {
  handleCreate,
  handleGetSingle,
  handleDelete,
} from "../helpers/baseHelpers.js";
import passwordGenerator from "../utils/generatePassword.js";
import { findUserByEmail, } from "../helpers/userHelper.js";

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

  handleCreate(User, newUser, res);
};

const httpGetAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password").sort({ firstName: 1 });
  return users ? res.status(200).json(users) : "Internal server error";
};

const httpGetUser = async (req, res) => {
  const { id } = req.params;
  const user = await handleGetSingle(User, id);

  return !user
    ? res.status(404).json({ status: "Fail", message: "User Not Found!" })
    : res.status(200).json(user);
};

const httpUpdateUser = () => {};

const httpDeleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await handleGetSingle(User, id);
  if (!user) {
    return res.status(400).json({status: "Fail", message: "Invalid user id"})
  }
  const isDeleted = await handleDelete(User, id)
  if(isDeleted.acknowledged) return res.status(200).json({message: `User with ${user.email} removed successfully`});
};

export {
  httpRegisterUser,
  httpGetAllUsers,
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
};
