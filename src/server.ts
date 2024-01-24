// src/server.ts

import express, { Application } from 'express';
import loggerMiddleware from './middleware/loggerMiddleware';
import authenticatedRequest from './middleware/jsonwebtoken';

import userRoutes from './routes/Routes';

const app: Application = express();
const port: number = 3000;

app.use(authenticatedRequest);
// Custom middleware to log requests
app.use(loggerMiddleware);

// Built-in middleware to parse JSON in the request body
app.use(express.json());

// Routes
app.use('/', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
