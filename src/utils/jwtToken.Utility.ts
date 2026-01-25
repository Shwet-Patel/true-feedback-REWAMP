import { JWT_SECRET } from '@/configs/env-config';
import jwt from 'jsonwebtoken';

export const generateToken = (payload: object, options?: jwt.SignOptions) => {
    const token = jwt.sign(payload, JWT_SECRET, options);
    return token;
}

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded as jwt.JwtPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token has expired. please login again.');
        }

        // typical error
        throw new Error('Invalid token');
    }
};