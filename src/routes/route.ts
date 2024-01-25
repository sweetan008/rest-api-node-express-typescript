import { Router } from 'express';
import multer from 'multer';
import { changeCannotGet, sampleEndpoint, uploadImage } from '../controllers/SampleController';

const upload = multer({ storage: multer.memoryStorage() });
const AllRouter = Router();

AllRouter.get('/', changeCannotGet);
AllRouter.get('/v1/sampleEndpoint', sampleEndpoint);
//Image Upload
AllRouter.post('/v1/UploadImages', upload.array('file'), uploadImage);

export default AllRouter;