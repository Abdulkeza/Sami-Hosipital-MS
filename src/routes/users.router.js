import { Router } from "express";
import {
  httpRegisterUser,
  httpGetAllUsers,
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
  httpLoginUser,
} from "../controllers/users.controller.js";

const router = Router();

router.post("/", httpRegisterUser);
router.get("/", httpGetAllUsers);
router.post("/login", httpLoginUser);
router.get("/:id", httpGetUser);
router.patch("/:id", httpUpdateUser);
router.delete("/:id", httpDeleteUser);

export default router;
