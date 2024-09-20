import express from 'express';
import { register, login } from '../controllers/authController.js';
import { deleteUser, deleteUsers, getUsers, toggleUsers, toggleUser } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/table', authenticate, getUsers);
router.patch('/:id/block', authenticate, toggleUser);
router.delete('/:id', authenticate, deleteUser); 
router.patch('/block', authenticate, toggleUsers); // send { "userIds": [], "action": "block" || "unblock" } 
router.delete('/delete', authenticate, deleteUsers); // send { "userIds": [] }

export default router;
