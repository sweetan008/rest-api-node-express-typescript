import express, { Application } from 'express';
import loggerMiddleware from './middleware/loggerMiddleware';
import authenticatedRequest from './middleware/jsonwebtoken';
import Routes from './routes/Routes';
import { port } from './config'; // Import the port variable from config.ts

const app: Application = express();

// Use the port variable from config.ts
const portNumber = port || 3000;

app.use(authenticatedRequest);
app.use(loggerMiddleware);
app.use(express.json());
app.use('/v1', Routes);

app.listen(portNumber, () => {
  console.log(`Server is running on port ${portNumber}`);
});
