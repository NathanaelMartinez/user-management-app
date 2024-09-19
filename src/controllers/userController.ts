import { Request, Response } from 'express';
import User from "../models/User.js";

export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
};

export const blockUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // check if already blocked
        if (user.status === 'blocked') {
            return res.status(400).json({ message: 'User is already blocked.' });
        }

        user.status = 'blocked';
        await user.save();

        res.status(200).json({ message: 'User blocked successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const unblockUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // check if already active
        if (user.status === 'active') {
            return res.status(400).json({ message: 'User is already active.' });
        }

        user.status = 'active';
        await user.save();

        res.status(200).json({ message: 'User unblocked successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        await user.destroy();

        res.status(200).json({ message: 'User blocked successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}