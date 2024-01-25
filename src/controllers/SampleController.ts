// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/jsonwebtoken';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { secret_key } from '../config';

const SECRET_KEY = secret_key;

export const sampleEndpoint = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {

    const {  } = req.body;

    const expiresIn = '8h';
    const token = jwt.sign({ userName:"yourname", userId: "id" }, SECRET_KEY, { expiresIn });
    console.log(token);

    res.status(200).json({
      success: true,
      statuscode:200,
      message: 'Sample End Point performed successfully',
      token:token
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error });
  }
};

export const uploadImage = async (
  req: AuthenticatedRequest,
  res: Response,
  additionalData: any
): Promise<void> => {
  try {
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];

      const filePathCons = "image_url" + "/" + "image_folder_name"

      if (!fs.existsSync(filePathCons)) {
          fs.mkdirSync(filePathCons, { recursive: true });
      }

      const imageUrls: string[] = [];

      for (const file of files) {
          const { buffer, originalname }: any = file;

          const uuidFilename = uuidv4();
          const filePath = path.join(filePathCons, `${uuidFilename}${path.extname(originalname)}`);

          fs.writeFileSync(filePath, buffer);

          const imageUrl = filePath;
          imageUrls.push(imageUrl);
      }
      res.status(200).json({ success: true, message: 'Images uploaded successfully', data: { imageUrls } });

  } catch (error) {
      console.error('Error processing image upload request:', error);
      res.status(500).json({ success: false, message: 'Server error', error: error });
  }
};

export const changeCannotGet = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const successPage = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>connected successfully</title>
          <style>
              /* CSS to center the content */
              body {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
              }
          </style>
      </head>
      <body>
          <h1>connection established.</h1>
      </body>
      </html>
    `;
    res.status(200).send(successPage);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
