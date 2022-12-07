import { Router } from 'express';

import userRouter from "./users.router.js";
import institutionRouter from './institution.router.js'

const apiRouter = Router();


apiRouter.use('/users', userRouter);
apiRouter.use('/institutions', institutionRouter);

export default apiRouter;