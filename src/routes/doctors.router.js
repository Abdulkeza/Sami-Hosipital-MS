import { Router } from "express";

import { httpRegisterDoctor, httpGetDoctors, httpGetDoctor, httpDeleteDoctor } from "../controllers/doctors.controller.js";

const router = Router();

router.post("/", httpRegisterDoctor);
router.get("/", httpGetDoctors);
router.get("/:id", httpGetDoctor);
// router.patch("/:id", httpUpdateUser);
router.delete("/:id", httpDeleteDoctor);

export default router;