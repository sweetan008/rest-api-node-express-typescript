// src/routes/Routes.ts

import { Router } from 'express';
import {sampleEndPoint}  from '../controllers/SampleController';

const router: Router = Router();

router.get('/v1', sampleEndPoint );

export default router;
