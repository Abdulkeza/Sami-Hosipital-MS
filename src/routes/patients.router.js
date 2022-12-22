import { Router } from "express";
import { httpRegisterPatient, httpGetAllPatients, httpGetPatient, httpDeletePatient, httpUpdatePatient } from "../controllers/patients.controller.js";


const router = Router();

router.post("/", httpRegisterPatient);
router.get("/", httpGetAllPatients);
router.get("/:id", httpGetPatient);
 router.patch("/:id", httpUpdatePatient);
router.delete("/:id", httpDeletePatient);

export default router;