// routes/gemini.js

import express from 'express';
// 👈 Import the controller where the Gemini logic lives
import { getRecommendations } from '../controllers/geminiController.js'; 

const geminiRouter = express.Router();

/**
 * Route: POST /api/gemini/suggestions
 * Fetches user preferences and menu data, sends to Gemini, and returns recommendations.
 */
// geminiRouter.post('/suggestions', getRecommendations);
// routes/gemini.js (Temporary Debug)

geminiRouter.post('/suggestions', (req, res, next) => {
    console.log("LOG: /api/gemini/suggestions route reached successfully!");
    next(); // Proceed to the getRecommendations controller
}, getRecommendations);

export default geminiRouter;