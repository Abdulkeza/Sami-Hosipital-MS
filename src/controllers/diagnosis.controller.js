import {
  handleCreate,
  handleGetAll,
  handleGetSingle,
  handleDelete,
  handleUpdate
} from "../helpers/baseHelpers.js";
import Diagnosis from "../models/Diagnosis.model.js";
import Patient from "../models/Patient.model.js";
import {
  handleGetDiagnosisByPatientId,
  handleAddDiagnosisForPatient,
} from "../helpers/diagnosisHelper.js";
import { validateDiagnosisCreationAccess } from "../helpers/institutionHelper.js";

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
    examiner: req.user._id,
    timestamp: new Date(),
  };

  console.log(req.user._id)

  const createdDiagnosis = await handleCreate(Diagnosis, newDiagnosis, res);

  if (createdDiagnosis) {
    await handleUpdate(Patient, patient, {hasDiagnosis: true}, res);
    res.status(201).json({ message: `Diagnosis successifully added to ${patientExist.firstName} ${patientExist.lastName}`,
    })
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

const httpGetPatientDiagnosis = async (req, res) => {
  const { id } = req.params;
  const diagnosis = await handleGetDiagnosisByPatientId(id);
  !diagnosis
    ? res.status(404).json({
        status: "Fail",
        message: "We can not find diagnosis for this patient",
      })
    : res.status(200).json(diagnosis);
};

const httpUpdateDiagnosis = async (req, res) => {
  // validateDiagnosisCreationAccess(req, res);

  const { id } = req.params;
  const patient = await handleGetSingle(Patient, id);
  const diagnosisData = req.body;
  const updatedDiagnosis = await handleAddDiagnosisForPatient(
    id,
    {...diagnosisData, examiner: req.user._id},
  );

if(updatedDiagnosis.acknowledged && diagnosisData.status === "transferred"){
  await handleUpdate(Patient, id, {referralHospital: diagnosisData.referralHospital, transfered: true}, res);
}

  updatedDiagnosis.acknowledged
    ? res.status(200).json({
        message: `Diagnosis added to ${patient.firstName} ${patient.lastName}`,
      })
    : res.status(500).json({ message: "internal server error" });
};

const httpDeletePatientDiagnosis = async (req, res) => {
  const { id } = req.params;
  const diagnosis = await handleGetSingle(Diagnosis, id);
  if (!diagnosis) {
    return res
      .status(400)
      .json({ status: "Fail", message: "ooops! diagnosis not found!" });
  }
  const isDeleted = await handleDelete(Diagnosis, id);
  if (isDeleted.acknowledged)
    res.status(200).json({ message: `Diagnosis removed successfully` });
};

export {
  httpAddDiagnosis,
  httpGetPatientDiagnosis,
  httpDeletePatientDiagnosis,
  httpUpdateDiagnosis,
};
