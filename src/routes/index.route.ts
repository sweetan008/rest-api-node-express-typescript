// src/routes/SetupRoutes.ts

import { Application } from "express";
import router from "./route";

export default function setupRoutes(app: Application) {
  //add your routes here
    app.use(router);
  }