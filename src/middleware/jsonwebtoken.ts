// src/middleware/jsonwebtoken.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Secret key for JWT signing and verification
const secretKey = process.env.JWT_SECRET || 'default_secret_key';

export interface AuthenticatedRequest extends Request {
    user?: { id: string; username: string }; // Add more user information as needed
}

// List of routes that should be excluded from JWT authentication
const excludedRoutes = ['/', '/v1']; // Add your excluded routes here

const isExcludedRoute = (url: string): boolean => {
    return excludedRoutes.some(route => url.startsWith(route));
};

const authenticatedRequest = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    // Check if the current route is excluded from JWT authentication
    if (isExcludedRoute(req.path)) {
        // Skip authentication for excluded routes
        next();
        return;
    }

    // Get the JWT from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).send('Unauthorized - Missing token');
        return;
    }

    // Verify the JWT
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            res.status(401).send('Unauthorized - Invalid token');
            return;
        }

        // Attach user information to the request object
        req.user = decoded as { id: string; username: string }; // Adjust based on your token structure

        // Continue to the next middleware or route handler
        next();
    });
};

export default authenticatedRequest;
