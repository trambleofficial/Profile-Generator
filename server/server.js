import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Request logging

// Static files (for production build)
// Not required in dev as Vite handles frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
}

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', profileRoutes);

// Catch-all for API 404
app.use('/api/*', (req, res) => {
    res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 [SERVER] Profile Generator API running on port ${PORT}`);
});
