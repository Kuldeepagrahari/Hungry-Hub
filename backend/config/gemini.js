// config/gemini.js

import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

// 1. Get API Key securely from the environment
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("FATAL ERROR: GEMINI_API_KEY is not defined in environment variables.");
    // In a production environment, you might want to stop the server here
}

// 2. Initialize the Gemini Client
const ai = new GoogleGenAI({ apiKey });

// 3. Define the Model to use (Flash is fast and great for structured tasks)
const model = 'gemini-2.5-flash';

// 4. Export the client and model name
export { ai, model };