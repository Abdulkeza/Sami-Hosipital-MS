
import { isSuperAdmin } from "../common/functionsAndVariables.js";
import { notAuthorized, userToken } from "./baseHelpers.js";




const validateHospitalCreationAccess = (req, res) => {
  const token = userToken(req, res);
    if (!isSuperAdmin(token.user.accessLevel)) {
      notAuthorized(res)
    } 
}

const validateDiagnosisCreationAccess = (req, res) => {
  const token = userToken(req, res);
    if (!isSuperAdmin(token.accessLevel)) {
      notAuthorized(res)
    } 
}

export {
    validateHospitalCreationAccess,
    validateDiagnosisCreationAccess
}