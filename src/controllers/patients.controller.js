import expressAsyncHandler from "express-async-handler";

import Patient from "../models/Patient.model.js";
import {
  handleCreate,
  handleGetSingle,
  handleDelete,
} from "../helpers/baseHelpers.js";

// @desc Register a new patient
// @route /api/v1/patients/register
// @access Public 
const httpRegisterPatient = async (req, res) => {
  //@patientId this field should increament automatically and must be unique for every patient
  const { firstName, lastName, phone, addresses, nationalId } = req.body;
// const userExist = await findUserByEmail(email)
//     if (userExist) {
//       return res.status(400).json({ status: "Fail", message: `Email ${email} is already in our system` });
//     }
//   const hashedPassword = await passwordGenerator(password);

  const newPatient = {
    firstName,
    lastName,
    phone,
    addresses,
    nationalId,
  };

  handleCreate(Patient, newPatient, res);
};


// @desc Get all patients
// @route /api/v1/patients/
const httpGetAllPatients = async (req, res) => {
  const patients = await Patient.find({}).sort({createdAt: -1 });
   (patients) ? res.status(200).json(patients) : res.status(200).json({message:"Internal server error"});
};

// @desc Get a patients by Id
// @route /api/v1/patients/Id
const httpGetPatient = async (req, res) => {
  const { id } = req.params;
  const patient = await handleGetSingle(Patient, id);

   (!patient) ? res.status(404).json({ status: "Fail", message: "Patient Not Found!" })
    : res.status(200).json(patient);
};

// @desc update a users
// @route /api/v1/users/Id
const httpUpdatePatient = (req, res) => {};

// @desc delete a user
// @route /api/v1/users/Id
const httpDeletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await handleGetSingle(Patient, id);
  if (!patient) {
    return res.status(400).json({status: "Fail", message: "Invalid patient id"})
  }
  const isDeleted = await handleDelete(Patient, id)
  if(isDeleted.acknowledged)  res.status(200).json({message: `${patient.firstName} ${patient.lastName} removed successfully`});
};

export {
  httpRegisterPatient,
  httpGetAllPatients,
  httpGetPatient,
  httpUpdatePatient,
  httpDeletePatient,
};
