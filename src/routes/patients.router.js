import { Router } from "express";
import {
  httpRegisterPatient,
  httpGetAllPatients,
  httpGetPatient,
  httpDeletePatient,
  httpUpdatePatient,
  httpGetPatientsWithinInstitution,
  httpGetTransferredPatientsWithinInstitution
} from "../controllers/patients.controller.js";
import authenticated from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", httpRegisterPatient);
router.get("/", authenticated, httpGetAllPatients);
router.get("/:id", authenticated, httpGetPatient);
router.patch("/:id", authenticated, httpUpdatePatient);
router.get("/", authenticated, httpGetPatientsWithinInstitution);
router.get("/incoming/patients", authenticated, httpGetTransferredPatientsWithinInstitution);

router.delete("/:id", authenticated, httpDeletePatient);


export default router;
