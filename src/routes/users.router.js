import { Router } from "express";
import {
  httpRegisterUser,
  httpGetAllUsers,
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
  httpLoginUser,
} from "../controllers/users.controller.js";
import authenticated from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", httpRegisterUser);
router.get("/", authenticated, httpGetAllUsers);
router.post("/login", httpLoginUser);
router.get("/:id", httpGetUser);
router.patch("/:id", httpUpdateUser);
router.delete("/:id", httpDeleteUser);

export default router;
