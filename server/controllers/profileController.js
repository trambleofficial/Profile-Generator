import * as profileService from '../services/profileService.js';
import { validationResult } from 'express-validator';

export const generateProfiles = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const count = parseInt(req.query.count) || 10;
        
        // Generate fresh profiles every time for maximum variety
        const profiles = profileService.generateBulkProfiles(count);
        
        res.json({
            success: true,
            source: 'generator',
            count: profiles.length,
            timestamp: new Date().toISOString(),
            data: profiles
        });
    } catch (error) {
        console.error("Error generating profiles:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate profiles',
            error: error.message
        });
    }
};
