import expressAsyncHandler from "express-async-handler";
import Diagnosis from "../models/Diagnosis.model.js";
import Patient from "../models/Patient.model.js";


const handleGetDiagnosisByPatientId = expressAsyncHandler(async(patientId) =>{
    const patientDiagnosis =  await Diagnosis.findOne({ patient: patientId })
    .populate({
        path: "patient",
        model: Patient,
        select: "firstName lastName gender phone addresses status transfered patientId"
    })

    return await patientDiagnosis;
   
})

export {handleGetDiagnosisByPatientId}