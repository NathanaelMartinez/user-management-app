import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/table', authenticate, (req, res) => {
    // route is protected - only accessible with valid token
    res.status(200).json({ message: 'DISPLAY ADMIN TABLE' });
  });

export default router;
