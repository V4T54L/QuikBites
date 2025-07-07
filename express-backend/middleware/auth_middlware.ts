import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, type AuthenticatedRequest } from '../model/model'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const EXPIRES_IN = '1h';

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === 'object' && 'id' in decoded) {
            req.user = decoded as User;
            next();
        } else {
            return res.status(401).json({ message: 'Invalid token structure' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const generateToken = (user: User): string => {
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: EXPIRES_IN,
    });
};
