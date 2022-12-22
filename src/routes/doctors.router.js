import { Router } from "express";

import { httpRegisterDoctor, httpGetDoctors, httpGetDoctor, httpDeleteDoctor } from "../controllers/doctors.controller.js";
import authenticated from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticated, httpRegisterDoctor);
router.get("/",authenticated, httpGetDoctors);
router.get("/:id",authenticated, httpGetDoctor);
// router.patch("/:id",authenticated, httpUpdateUser);
router.delete("/:id", authenticated, httpDeleteDoctor);

export default router;