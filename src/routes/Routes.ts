// src/routes/Routes.ts

import { Router } from 'express';
import {getTestOCR}  from '../controllers/SampleController';

const router: Router = Router();

router.get('/v1', getTestOCR );

export default router;
