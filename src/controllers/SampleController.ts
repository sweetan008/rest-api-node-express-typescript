// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/jsonwebtoken';

export const sampleEndpoint = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {

    const userId = req.user?.id;
    const username = req.user?.username;

    res.status(200).json({
      success: true,
      statuscode:200,
      message: 'Sample End Point performed successfully',
      user: { id: userId, username: username },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error });
  }
};
