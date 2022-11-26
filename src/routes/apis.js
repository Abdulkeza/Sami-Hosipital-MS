import { Router } from 'express';

import userRouter from "./users.router.js";

const apiRouter = Router();


apiRouter.use('/users', userRouter);

export default apiRouter;