import Doctor from "../models/Doctor.model.js";
import User from "../models/User.model.js";
import {
  handleCreate,
  handleGetSingle,
  handleDelete,
  handleCreateUser
} from "../helpers/baseHelpers.js";
import {
  findDoctorByUserId,
  httpGetDoctorById,
  handleGetAllDoctors,
} from "../helpers/doctorHelper.js";
import { findUserByEmail } from "../helpers/userHelper.js";
import passwordGenerator from "../utils/generatePassword.js";

//@desc we are using the same route api/v1/users to create both doctors, nurse and receptioniste
//@desc mean we do need this for now
const httpRegisterDoctor = async (req, res) => {
  // const {
  //   speciality,
  //   institution,
  //   firstName,
  //   lastName,
  //   email,
  //   phone,
  //   password,
  //   role,
  //   accessLevel,
  // } = req.body;

  // const doctorExist = await findDoctorByUserId(user);
  // if (doctorExist) {
  //     return res.status(400).json({ status: "Fail", message: `Doctor is already in our system` });
  //   }

  // const userExist = await findUserByEmail(email);
  // if (userExist) {
  //   return res
  //     .status(400)
  //     .json({
  //       status: "Fail",
  //       message: `Doctor ${firstName} ${lastName} is already in our system`,
  //     });
  // }
  // const hashedPassword = await passwordGenerator(password);

  // const newUser = {
  //   firstName,
  //   lastName,
  //   email,
  //   phone,
  //   password: hashedPassword,
  //   role,
  //   accessLevel,
  // };


  // const createdUser = await handleCreateUser(User, newUser, res);
  // if (createdUser) {
  //   const newDoctor = {
  //     user: createdUser._id,
  //     speciality,
  //     institution,
  //   };
  //   const createdDoctor = await handleCreate(Doctor, newDoctor, res );
  //   res.status(201).json({
  //     _id: createdDoctor._id,
  //     email: createdUser.email,
  //     lastName: createdUser.lastName,
  //     firstName: createdUser.firstName,
  //     role: createdUser.role,
  //     phone: createdUser.phone,
  //   })
  // } else {
  //   res.status(500).json({ message: "Internal server error!" });
  // }

};

const httpGetDoctors = async (req, res) => {
  const doctors = await handleGetAllDoctors(Doctor);
  return res.status(200).json(doctors);
};

const httpGetDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await httpGetDoctorById(Doctor, id);

  !doctor
    ? res.status(404).json({ status: "Fail", message: "Doctor Not Found!" })
    : res.status(200).json(doctor);
};

const httpDeleteDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await handleGetSingle(Doctor, id);
  if (!doctor) {
    return res
      .status(400)
      .json({ status: "Fail", message: "Invalid doctor id" });
  }

   if(doctor.user != null) handleDelete(User, doctor.user);
  const isDeleted = await handleDelete(Doctor, id);
  if (isDeleted.acknowledged)
    res.status(200).json({ message: `Doctor removed successfully` });
};

export { httpRegisterDoctor, httpGetDoctors, httpGetDoctor, httpDeleteDoctor };
