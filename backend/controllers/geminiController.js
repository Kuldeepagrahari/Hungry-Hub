import { ai, model } from '../config/gemini.js';
import { getAllFoodItemsForAI } from './foodController.js';

export const getRecommendations = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, message: "A query prompt is required." });
        }

        // 2. Get Menu Data
        const menuData = await getAllFoodItemsForAI();

        // 3. Construct the Master Prompt (Critical!)
        const masterPrompt = `
            Based on the user's specific request: "${prompt}", and the available menu items below,
            provide a personalized meal suggestion.

            RULES:
            1. Suggest 3-5 items from the menu.
            2. Suggest 1-2 items from the menu to AVOID.
            3. For each suggestion, provide a brief, professional reason (1 sentence) specific to the user's need (e.g., 'Good for high protein diet').
            4. **CRITICAL:** Respond ONLY with a valid, clean JSON object. Do NOT include any external text, markdown, or explanation outside of the JSON structure:
            
            ${JSON.stringify({
                "recommended": [{"name": "Item Name", "reason": "Why it fits the user's criteria."}],
                "avoid": [{"name": "Item Name", "reason": "Why to avoid."}]
            })}

            Available Menu Items (JSON array):
            ${JSON.stringify(menuData)}
        `;

        // 4. Call the Gemini API
        const response = await ai.models.generateContent({
            model: model,
            contents: masterPrompt,
        });

        // 5. Parse the Structured Response
        const geminiText = response.text.trim();
        let parsedResult;
        
        try {
            // Clean up common markdown wrapping before parsing
            parsedResult = JSON.parse(geminiText.replace(/```json|```/g, '').trim()); 
        } catch (e) {
            console.error("Failed to parse structured Gemini JSON:", geminiText);
            // Send a safe, user-friendly error
            return res.status(500).json({ success: false, message: "AI response format error. Please try again or refine your query." });
        }

        // 6. Send the clean JSON recommendations back to the client
        res.json(parsedResult);

    } catch (error) {
        console.error("Server Error in getRecommendations:", error.message);
        res.status(500).json({ success: false, message: "A server error occurred: " + error.message });
    }
};