import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";
import User from "../models/User.model.js";

const findUserByEmail = expressAsyncHandler(async (email) => {
  return await User.findOne({ email: email }, (error, result) => {
    if (error) return null;
    return result;
  })
    .clone()
    .catch((err) => {
      console.log(err);
    });
});

//check if pswd is valid
const isCorrectPassword = expressAsyncHandler(async (foundUser, userInfo) => {
  if (foundUser && (await bcrypt.compare(userInfo.password, foundUser.password))) {
      return true
  }
  return false
})

// Token generator
const generateToken = (user) => {
  console.log(user)
  //we may also include user role with in token???????????????/
  return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '60d'
  })
}



const handleGetAllUsers = expressAsyncHandler(async(model, res) =>{

 
})


export { findUserByEmail, handleGetAllUsers, isCorrectPassword, generateToken};
