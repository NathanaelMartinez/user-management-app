import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    console.log('token',req.header('Authorization')?.split(' ')[1]);
    const token = req.header('Authorization')?.split(' ')[1]; // get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        console.log('Decoded token:', decoded);

        // check if the user is blocked
        const user = await User.findByPk(decoded.userId);
        if (user?.status === 'blocked') {
            return res.status(403).json({ message: 'Account is blocked.' });
        }

        next(); // go to next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};
