import express from 'express';
import { register, login } from '../controllers/authController.js';
import { blockUser, deleteUser, getUsers, unblockUser } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/table', authenticate, getUsers);
router.patch('/:id/block', authenticate, blockUser);
router.patch('/:id/unblock', authenticate, unblockUser);
router.delete('/:id', authenticate, deleteUser);

export default router;
