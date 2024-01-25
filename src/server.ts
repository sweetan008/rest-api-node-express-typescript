import express, { Application } from 'express';
import loggerMiddleware from './middleware/loggerMiddleware';
import { port } from './config'; // Import the port variable from config.ts
import bodyParser from 'body-parser';
import cors from "cors";
import setupRoutes from './routes/index.route';
import authenticateToken from './middleware/jsonwebtoken';
import http from 'http';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticateToken);
app.use(loggerMiddleware);
app.use(express.json());
setupRoutes(app);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API started at http://localhost:${port}`);
});

