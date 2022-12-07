import Doctor from "../models/Doctor.model.js";
import { handleCreate, handleGetSingle, handleDelete } from "../helpers/baseHelpers.js";
import { findDoctorByUserId, httpGetDoctorById, handleGetAllDoctors } from "../helpers/doctorHelper.js";


const httpRegisterDoctor = async(req, res) =>{
    const { user, speciality, institution } = req.body;

    const doctorExist = await findDoctorByUserId(user);
    if (doctorExist) {
        return res.status(400).json({ status: "Fail", message: `Doctor is already in our system` });
      }

      const newDoctor = {
        user,
        speciality,
        institution
      };

      handleCreate(Doctor, newDoctor, res)
}

const httpGetDoctors = async (req, res) => {
    const doctors = await handleGetAllDoctors(Doctor);
    return res.status(200).json(doctors);
  };

const httpGetDoctor = async (req, res) => {
    const { id } = req.params;
    const doctor = await httpGetDoctorById(Doctor, id);
  
     (!doctor) ? res.status(404).json({ status: "Fail", message: "Doctor Not Found!" })
      : res.status(200).json(doctor);
  };

  const httpDeleteDoctor = async (req, res) => {
    const { id } = req.params;
    const doctor = await handleGetSingle(Doctor, id);
    console.log(doctor)
    if (!doctor) {
      return res.status(400).json({status: "Fail", message: "Invalid doctor id"})
    }
    const isDeleted = await handleDelete(Doctor, id)
    if(isDeleted.acknowledged)  res.status(200).json({message: `Doctor removed successfully`});
  };

export{
    httpRegisterDoctor,
    httpGetDoctors,
    httpGetDoctor,
    httpDeleteDoctor

}