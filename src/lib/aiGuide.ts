import { POSE_TEMPLATES, CATEGORY_KEYWORDS, PoseTemplate } from '@/data/poseTemplates';
import { getGeminiModel } from './gemini';

// Helper to convert base64 to GoogleGenerativeAI Part
function fileToGenerativePart(base64Data: string, mimeType: string) {
    return {
        inlineData: {
            data: base64Data.split(',')[1],
            mimeType
        },
    };
}

export async function analyzeVibeWithGemini(inputText: string, imageSrc?: string | null): Promise<PoseTemplate> {
    const model = getGeminiModel();

    // Fallback: If no API key or model, use the old local keyword logic
    if (!model) {
        console.log("No Gemini API key found. Using fallback keyword matching.");
        return analyzeVibeLocal(inputText);
    }

    try {
        const prompt = `
        You are a professional photographer director.
        Analyze the input (text: "${inputText}") and the image (if provided).
        
        We have these pose categories:
        1. Casual (daily, relaxed, cafe)
        2. Professional (business, profile, interview)
        3. Travel (landmark, scenery, nature)
        4. Creative (artistic, fun, dynamic)

        Task:
        1. Determine the best category for this person/background.
        2. Return ONLY the category name from the list above. Nothing else.
        Example output: "Travel"
        `;

        const parts: any[] = [prompt];
        if (imageSrc) {
            // Assuming jpeg/png, standard base64
            // Extract mime type from "data:image/jpeg;base64,..."
            const mimeType = imageSrc.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0] || 'image/jpeg';
            parts.push(fileToGenerativePart(imageSrc, mimeType));
        }

        const result = await model.generateContent(parts);
        const response = await result.response;
        const text = response.text().trim();

        console.log("Gemini AI Response:", text);

        // Map response to our templates
        // We look for the category name in the response
        const validCategories = ['Casual', 'Professional', 'Travel', 'Creative'];
        const matchedCategory = validCategories.find(cat => text.includes(cat)) || 'Casual';

        // Find a random template in that category
        const matches = POSE_TEMPLATES.filter(p => p.category === matchedCategory);
        if (matches.length > 0) {
            return matches[Math.floor(Math.random() * matches.length)];
        }

        return POSE_TEMPLATES[0]; // Fallback

    } catch (error) {
        console.error("Gemini API Error:", error);
        return analyzeVibeLocal(inputText);
    }
}

// The original local logic, kept as fallback
function analyzeVibeLocal(inputText: string): PoseTemplate {
    const normalize = (s: string) => s.toLowerCase();
    const input = normalize(inputText);

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        if ((keywords as string[]).some(k => input.includes(k))) {
            const matches = POSE_TEMPLATES.filter(p => p.category === category);
            if (matches.length > 0) {
                return matches[Math.floor(Math.random() * matches.length)];
            }
        }
    }
    return POSE_TEMPLATES[0];
}
