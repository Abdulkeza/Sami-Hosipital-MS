import { Router } from 'express';
import { httpRegisterUser, httpGetAllUsers, httpGetUser, httpUpdateUser, httpDeleteUser } from "../controllers/users.controller.js";

const router = Router();

router.post('/', httpRegisterUser);
router.get('/', httpGetAllUsers);
router.get('/:id', httpGetUser);
router.patch('/:id', httpUpdateUser);
router.delete('/:id', httpDeleteUser);

export default router;
