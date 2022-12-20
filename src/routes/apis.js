import { Router } from 'express';

import userRouter from "./users.router.js";
import institutionRouter from './institution.router.js'
import doctorRouter from './doctors.router.js'
import patientRouter from './patients.router.js'
import diagnosisRouter from './diagnosis.router.js'

const apiRouter = Router();


apiRouter.use('/users', userRouter);
apiRouter.use('/institutions', institutionRouter);
apiRouter.use('/doctors', doctorRouter);
apiRouter.use('/patients', patientRouter);
apiRouter.use('/diagnosis', diagnosisRouter);

export default apiRouter;