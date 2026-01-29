import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with the key from environment variables
// Users must create a .env file with VITE_GEMINI_API_KEY=...
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

export const getGeminiModel = () => {
    if (!genAI) {
        console.warn("Gemini API Key is missing. Creating fallback or dummy instance if possible, but real calls will fail.");
        return null;
    }
    // Using the cost-effective Flash model
    // Updated to user requested model
    return genAI.getGenerativeModel({
        model: "gemini-2.5-flash-image",
        generationConfig: {
            temperature: 0.1, // Low temperature for deterministic/consistent results
            maxOutputTokens: 1000,
        }
    });
};
