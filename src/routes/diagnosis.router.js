import { Router } from "express";
import { httpAddDiagnosis, httpGetPatientDiagnosis, httpDeletePatientDiagnosis, httpUpdateDiagnosis } from "../controllers/diagnosis.controller.js";


const router = Router();

router.post("/", httpAddDiagnosis);
router.get("/:id", httpGetPatientDiagnosis);
router.delete("/:id", httpDeletePatientDiagnosis);
router.patch("/:id", httpUpdateDiagnosis)

export default router;