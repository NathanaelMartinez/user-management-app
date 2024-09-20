import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UniqueConstraintError } from 'sequelize';
import User from '../models/User.js';

export const register = async (req: Request, res: Response) => {
    if (!req.body.password || req.body.password.trim() === '') {
        return res.status(400).json({ message: 'Password cannot be empty.' });
    }

    try {    
        // hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // create user
        const user = await User.create({ 
            name: req.body.name,
            email: req.body.email, 
            password: hashedPassword 
        });
        return res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {  
    try {
        // find user if exists
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        // check if password correct
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // check if the user is blocked
        if (user?.status === "blocked") {
            return res.status(403).json({ message: 'Account is blocked.' });
        }

        // update lastLogin
        await user.update({ lastLogin: new Date() });
  
        // generate JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' }); // for validation
        return res.status(200).json({ message: 'Login successful', token });
    }   catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error.' });
    }
};