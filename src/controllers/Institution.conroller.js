import {
  handleCreate,
  handleGetAll,
  handleGetSingle,
  handleDelete,
} from "../helpers/baseHelpers.js";
import Institution from "../models/Institution.model.js";
import { validateHospitalCreationAccess } from "../helpers/institutionHelper.js";
import { institutionTypes } from "../common/functionsAndVariables.js";
import User from "../models/User.model.js";
import passwordGenerator from "../utils/generatePassword.js";
 
const httpRegisterInstitution = async (req, res) => {
  const { name, email, users, phone, type, admin } = req.body;
  //   const userExist = await findUserByEmail(email)
  //       if (userExist) {
  //         return res.status(400).json({ status: "Fail", message: `Email ${email} is already in our system` });
  //       }
  //     const hashedPassword = await passwordGenerator(password);

  // if (type == institutionTypes[0]) {
  //   validateHospitalCreationAccess(req, res);
  // }

  const newInstitution = {
    name,
    email,
    users,
    phone,
    type,
    admin
  };
  const createdInstitution = await handleCreate(
    Institution,
    newInstitution,
    res
  );

  const body = await User.create({
    firstName:name,
    lastName:'-' ,
    email:email ,
    phone:phone,
    password: await passwordGenerator('1234'),
    role:'receptionist',
    institution:createdInstitution._id,
  });
  console.log(body)
  createdInstitution
    ? res.status(201).json(createdInstitution)
    : res.status(500).json({ message: "Internal server error!" });
};

const httpGetAllInstitutions = async (req, res) => {
  const institutions = await handleGetAll(Institution);
  return res.status(200).json(institutions);
};

const httpGetInstitution = async (req, res) => {
  const { id } = req.params;
  const institution = await handleGetSingle(Institution, id);

  !institution
    ? res
        .status(404)
        .json({ status: "Fail", message: "Institution Not Found!" })
    : res.status(200).json(institution);
};

const httpDeleteInstitution = async (req, res) => {
  const { id } = req.params;
  const institution = await handleGetSingle(Institution, id);
  if (!institution) {
    return res
      .status(400)
      .json({ status: "Fail", message: "Invalid institution id" });
  }
  const isDeleted = await handleDelete(Institution, id);
  if (isDeleted.acknowledged)
    res
      .status(200)
      .json({ message: `${institution.name} removed successfully` });
};

export {
  httpRegisterInstitution,
  httpGetAllInstitutions,
  httpGetInstitution,
  httpDeleteInstitution,
};
