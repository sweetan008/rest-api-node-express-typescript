// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/jsonwebtoken';

export const getTestOCR = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    // Access user information from the request object
    const userId = req.user?.id;
    const username = req.user?.username;

    res.status(200).json({
      success: true,
      message: 'Images uploaded and OCR performed successfully',
      user: { id: userId, username: username },
    });
  } catch (error) {
    console.error('Error processing image upload request:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error });
  }
};
