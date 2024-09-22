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

export const toggleUser = async (req: Request, res: Response) => {
    const ACTIVE = 'active';
    const BLOCKED = 'blocked';
    const { action } = req.body;

    // validate action
    if (!['block', 'unblock'].includes(action)) {
        return res.status(400).json({ message: 'Invalid action. Must be "block" or "unblock".' });
    }

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        if (action === 'block' && user.status === ACTIVE) {
            user.status = BLOCKED; // block user
            await user.save();
            return res.status(200).json({ message: `User has been blocked.` });
        } else if (action === 'unblock' && user.status === BLOCKED) {
            user.status = ACTIVE; // unblock user
            await user.save();
            return res.status(200).json({ message: `User has been unblocked.` });
        } else {
            return res.status(204).send(); // no changes made
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        await user.destroy();
        res.status(200).json({ message: 'User has been deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    const  { userIds } = req.body;

    if (!Array.isArray(userIds)) {
        return res.status(400).json({ message: 'Invalid user IDs. Must be a non-empty array.' });
    }

    if (userIds.length === 0) {
        return res.status(400).json({ message: 'No user IDs provided.' });
    }

    try {
        await User.destroy({ where: { id: userIds } });
        res.status(200).json({ message: 'Users have been deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const toggleUsers = async (req: Request, res: Response) => {
    const ACTIVE = 'active'; // no 'magic strings'
    const BLOCKED = 'blocked';
    const { userIds, action } = req.body; // expecting user IDs and action type (blocking/unblocking)

    // validate input
    if (!Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({ message: 'Invalid user IDs. Must be an array.' });
    }

    if (!['block', 'unblock'].includes(action)) {
        return res.status(400).json({ message: 'Invalid action. Must be "block" or "unblock".' });
    }

    try {
        const users = await User.findAll({ where: { id: userIds } });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found.' });
        }

        // process users based on action type
        const promises = users.map(user => {
            if (action === 'block' && user.status === ACTIVE) {
                user.status = 'blocked'; // block user
                return user.save();
            } else if (action === 'unblock' && user.status === BLOCKED) {
                user.status = 'active'; // unblock user
                return user.save();
            }
            // if user's status already action type, do nothing
            return Promise.resolve(); // return resolved promise to catch unchanged users
        });

        await Promise.all(promises);

        res.status(200).json({ message: `Users have been ${action}ed.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};