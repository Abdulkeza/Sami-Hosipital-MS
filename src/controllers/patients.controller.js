import expressAsyncHandler from "express-async-handler";

import Patient from "../models/Patient.model.js";
import {
  handleCreate,
  handleGetSingle,
  handleDelete,
  handleGetAll,
  GeneratePatientId,
  handleUpdate,
} from "../helpers/baseHelpers.js";

// @desc Register a new patient
// @route /api/v1/patients/register
// @access Public
const httpRegisterPatient = async (req, res) => {
  const defaultPatientId = await GeneratePatientId(Patient);

  const { firstName, lastName, phone, addresses, nationalId, institution } = req.body;

  const newPatient = {
    firstName,
    lastName,
    phone,
    addresses,
    nationalId,
    patientId: defaultPatientId,
    institution
  };

  const createdPatient = await handleCreate(Patient, newPatient, res);
  res.status(201).json(createdPatient);
};

// @desc Get all patients
// @route /api/v1/patients/
const httpGetAllPatients = async (req, res) => {
  const patients = await Patient.find({institution: req.user.institution}).sort({ createdAt: -1 });
  patients
    ? res.status(200).json(patients)
    : res.status(200).json({ message: "Internal server error" });
};

// @desc Get a patients by Id
// @route /api/v1/patients/Id
const httpGetPatient = async (req, res) => {
  const { id } = req.params;
  const patient = await handleGetSingle(Patient, id);

  !patient
    ? res.status(404).json({ status: "Fail", message: "Patient Not Found!" })
    : res.status(200).json(patient);
};

// @desc update a users
// @route /api/v1/users/Id
const httpUpdatePatient = async (req, res) => {
  const { id } = req.params;
  const patientData = req.body;
  const updatedPatient = await handleUpdate(Patient, id, patientData, res);

  !updatedPatient
    ? res.status(400).json({ message: "please provide valid data" })
    : res.status(200).json(updatedPatient);
};

const httpGetPatientsWithinInstitution = async(req, res) =>{

}

const httpGetTransferredPatientsWithinInstitution = async(req, res) =>{

}

// @desc delete a user
// @route /api/v1/users/Id
const httpDeletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await handleGetSingle(Patient, id);
  if (!patient) {
    return res
      .status(400)
      .json({ status: "Fail", message: "Invalid patient id" });
  }
  const isDeleted = await handleDelete(Patient, id);
  if (isDeleted.acknowledged)
    res.status(200).json({
      message: `${patient.firstName} ${patient.lastName} removed successfully`,
    });
};

export {
  httpRegisterPatient,
  httpGetAllPatients,
  httpGetPatient,
  httpUpdatePatient,
  httpDeletePatient,
  httpGetPatientsWithinInstitution,
  httpGetTransferredPatientsWithinInstitution
};
