
import Institution from "../models/Institution.model.js";
import { isSuperAdmin } from "../common/functionsAndVariables.js";
import { notAuthorized, userToken } from "./baseHelpers.js";




const validateHospitalCreationAccess = (req, res) => {
  const token = userToken(req);
    if (!isSuperAdmin(token.user.accessLevel)) {
      notAuthorized(res)
    } 
}

const validateDiagnosisCreationAccess = (req, res) => {
  const token = userToken(req);
    if (!isSuperAdmin(token.accessLevel)) {
      notAuthorized(res)
    } 
}

export {
    validateHospitalCreationAccess,
    validateDiagnosisCreationAccess
}