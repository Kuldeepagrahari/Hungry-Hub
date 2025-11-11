import express from 'express';

import { getRecommendations } from '../controllers/geminiController.js'; 

const geminiRouter = express.Router();

geminiRouter.post('/suggestions', getRecommendations);

export default geminiRouter;