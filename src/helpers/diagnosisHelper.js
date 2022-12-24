import expressAsyncHandler from "express-async-handler";
import Diagnosis from "../models/Diagnosis.model.js";
import Patient from "../models/Patient.model.js";
import { handleGetSingle } from "./baseHelpers.js";
import { notAuthorized, userToken } from "./baseHelpers.js";
import { isSuperAdmin } from "../common/functionsAndVariables.js";


const handleGetDiagnosisByPatientId = expressAsyncHandler(async(patientId) =>{
    const patientDiagnosis =  await Diagnosis.findOne({ patient: patientId })
    .populate({
        path: "patient",
        model: Patient,
        select: "firstName lastName gender phone addresses status transfered patientId"
    });

    return await patientDiagnosis;
   
})

const handleAddDiagnosisForPatient = expressAsyncHandler(async(patientId, diagnosis, res) =>{
   // const {id} = req.params;
  const dbDiagnosis =  await Diagnosis.findOne({ patient: patientId });

   if(!dbDiagnosis) res.status(400).json({message: "Patient diagnosis not found!"});


   const updatedDiagnosis = await Diagnosis.updateOne(   { patient: patientId }, { $push: { treatment: diagnosis } },);
   return await updatedDiagnosis;
})

const validateDiagnosisCreation =expressAsyncHandler(async(diagnosis, req, res) =>{
    if(!diagnosis["symptoms"] || !diagnosis["disease"] || !diagnosis["medecine"]){
        res.status(400).json({message: "Please provide patient symptoms, disease and medecine"})
    } else if(!diagnosis["examiner"]){
        res.status(400).json({message: "Please add examiner!"});
    }
})

const findPatientWithDiagnosis = expressAsyncHandler(async (patientId) => {
    return await Diagnosis.findOne({ patient: patientId }, (error, result) => {
      if (error) return null;
      return result;
    })
      .clone()
      .catch((err) => {
        console.log(err);
      });
  });
  

export {handleGetDiagnosisByPatientId, handleAddDiagnosisForPatient, validateDiagnosisCreation, findPatientWithDiagnosis}