import { Router, Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { secret_key } from '../config';

const jwtSecretKey = secret_key;
const excludedPaths = [
    "/",
    "/v1/sampleEndpoint",
]

export interface AuthenticatedRequest extends Request {
    userId?: string;
}
// Middleware function to verify JWT token
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (
        excludedPaths.includes(req.path)
        // req.path.match(/^\/v1\/user\/error-code\/\w+/)
    ) {
        // console.log('Path excluded from token verification:', req.path);
        return next();
    }

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, jwtSecretKey, (err: jwt.JsonWebTokenError | TokenExpiredError | null, decoded: any) => {

        if (err) {
            if (err instanceof TokenExpiredError) {
                console.log('Token Expired. Token details:', decoded);
                return res.status(401).json({ message: 'Token Expired' });
            }
            console.log('Invalid Token. Error details:', err);
            return res.status(401).json({ message: 'Invalid Token' });
        }

        req.userId = decoded?.userId;
        console.log('Token Verified. Token details:', decoded);
        next();
    });
};


export default authenticateToken;
