import { Router } from "express";
import { httpAddDiagnosis, httpGetPatientDiagnosis, httpDeletePatientDiagnosis, httpUpdateDiagnosis } from "../controllers/diagnosis.controller.js";
import authenticated from "../middleware/auth.middleware.js";


const router = Router();

router.post("/", authenticated, httpAddDiagnosis);
router.get("/:id", authenticated, httpGetPatientDiagnosis);
router.delete("/:id", authenticated, httpDeletePatientDiagnosis);
router.patch("/:id",authenticated, httpUpdateDiagnosis)

export default router;