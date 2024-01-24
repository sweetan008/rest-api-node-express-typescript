// src/routes/Routes.ts

import { Router } from 'express';
import {sampleEndpoint}  from '../controllers/SampleController';

const router: Router = Router();

router.get('/sampleEndpoint', sampleEndpoint );

export default router;
