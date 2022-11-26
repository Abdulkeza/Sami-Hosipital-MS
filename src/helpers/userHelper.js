import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

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


const handleGetAllUsers = expressAsyncHandler(async(model, res) =>{

 
})

export { findUserByEmail, handleGetAllUsers};
