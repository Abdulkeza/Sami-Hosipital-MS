import { Router } from "express";
import { httpRegisterPatient, httpGetAllPatients, httpGetPatient, httpDeletePatient, httpUpdatePatient } from "../controllers/patients.controller.js";
import authenticated from "../middleware/auth.middleware.js";


const router = Router();

router.post("/", authenticated, httpRegisterPatient);
router.get("/",authenticated, httpGetAllPatients);
router.get("/:id",authenticated, httpGetPatient);
 router.patch("/:id", authenticated, httpUpdatePatient);
router.delete("/:id", authenticated, httpDeletePatient);

export default router;