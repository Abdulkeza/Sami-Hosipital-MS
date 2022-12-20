import {
  handleCreate,
  handleGetAll,
  handleGetSingle,
  handleDelete,
} from "../helpers/baseHelpers.js";
import Diagnosis from "../models/Diagnosis.model.js";
import Patient from "../models/Patient.model.js";
import { handleGetDiagnosisByPatientId } from "../helpers/diagnosisHelper.js";

const httpAddDiagnosis = async (req, res) => {
  const { patient, treatment } = req.body;
  const patientExist = await handleGetSingle(Patient, patient);
  if (!patientExist)
    return res
      .status(400)
      .json({ status: "Fail", message: "Patient Not found!" });

  // if (type == institutionTypes[0]) {
  //   validateHospitalCreationAccess(req, res);
  // }

  const newDiagnosis = {
    patient,
    treatment,
    timestamp: new Date()
  };
  console.log("+++++++++++++", newDiagnosis)
  const createdDiagnosis = await handleCreate(Diagnosis, newDiagnosis, res);

  createdDiagnosis
    ? res
        .status(201)
        .json({
          message: `Diagnosis successifully added to ${patientExist.firstName} ${patientExist.lastName}`,
        })
    : res.status(500).json({ message: "Internal server error" });
};

const httpGetPatientDiagnosis = async (req, res) =>{
  const { id } = req.params;
  const diagnosis = await handleGetDiagnosisByPatientId(id);
  !diagnosis
  ? res
      .status(404)
      .json({ status: "Fail", message: "We can not find diagnosis for this patient" })
  : res.status(200).json(diagnosis);
}


const httpDeletePatientDiagnosis = async(req, res) =>{
  const { id } = req.params;
  const diagnosis = await handleGetSingle(Diagnosis, id);
  if (!diagnosis) {
    return res.status(400).json({ status: "Fail", message: "ooops! diagnosis not found!" });
  }
  const isDeleted = await handleDelete(Diagnosis, id);
  if (isDeleted.acknowledged)
    res
      .status(200)
      .json({ message: `Diagnosis removed successfully` });
}

export {
  httpAddDiagnosis,
  httpGetPatientDiagnosis,
  httpDeletePatientDiagnosis

};
