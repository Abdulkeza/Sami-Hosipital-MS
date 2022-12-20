import { Router } from "express";
import { httpAddDiagnosis, httpGetPatientDiagnosis, httpDeletePatientDiagnosis } from "../controllers/diagnosis.controller.js";


const router = Router();

router.post("/", httpAddDiagnosis);
router.get("/:id", httpGetPatientDiagnosis);
router.delete("/:id", httpDeletePatientDiagnosis);

export default router;