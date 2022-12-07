import expressAsyncHandler from "express-async-handler";
import Doctor from "../models/Doctor.model.js";
import Institution from "../models/Institution.model.js";
import User from "../models/User.model.js";

const findDoctorByUserId = expressAsyncHandler(async (user) => {
  return await Doctor.findOne({ user: user }, (error, result) => {
    if (error) return null;
    return result;
  })
    .clone()
    .catch((err) => {
      console.log(err);
    });
});

const httpGetDoctorById = expressAsyncHandler(async (Model, itemId) => {
  return await Model.findById(itemId, { password: 0 })
    .populate({
      path: "user",
      model: User,
      select: "firstName lastName email phone role",
    })
    .populate({
      path: "institution",
      model: Institution,
      select: "name email phone type addresses",
    });
});

const handleGetAllDoctors = expressAsyncHandler(async (Model) => {
  const items = await  Model.find({}).sort({createdAt: -1,})
  .populate({
    path: "user",
    model: User,
    select: "firstName lastName email phone",
  }).populate({
    path: "institution",
    model: Institution,
    select: "name phone type",
  });
  return await items ? items: " Internal server error";
});

export { findDoctorByUserId, httpGetDoctorById, handleGetAllDoctors };
