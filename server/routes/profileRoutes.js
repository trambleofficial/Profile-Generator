import express from 'express';
import * as profileController from '../controllers/profileController.js';
import rateLimit from 'express-rate-limit';
import { query } from 'express-validator';

const router = express.Router();

// Rate limit: 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests, please try again later.' }
});

// Validation middleware
const validateCount = [
    query('count')
        .optional()
        .isInt({ min: 1, max: 1000 })
        .withMessage('Count must be an integer between 1 and 1000.')
];

// GET /api/profiles?count=10
router.get('/profiles', limiter, validateCount, profileController.generateProfiles);

export default router;
