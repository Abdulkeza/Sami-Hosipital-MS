import { Router } from 'express';

import userRouter from "./users.router.js";
import institutionRouter from './institution.router.js'
import doctorRouter from './doctors.router.js'

const apiRouter = Router();


apiRouter.use('/users', userRouter);
apiRouter.use('/institutions', institutionRouter);
apiRouter.use('/doctors', doctorRouter);

export default apiRouter;