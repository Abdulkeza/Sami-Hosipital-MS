import { Router } from "express";
import { httpRegisterInstitution, httpGetAllInstitutions, httpGetInstitution, httpDeleteInstitution } from "../controllers/Institution.conroller.js";

const router = Router();

router.post("/", httpRegisterInstitution);
router.get("/", httpGetAllInstitutions);
router.get("/:id", httpGetInstitution);
router.delete("/:id", httpDeleteInstitution);


export default router;


