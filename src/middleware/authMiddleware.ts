import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    console.log('token',req.header('Authorization')?.split(' ')[1]);
    const token = req.header('Authorization')?.split(' ')[1]; // get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log('Decoded token:', decoded);
        next(); // go to next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};
