import { getGeminiModel } from './gemini';
import { LocalizedText } from './photoAnalysis';

export interface ScoringResult {
    score: number;
    title: LocalizedText;
    criteria: {
        composition: number;
        lighting: number;
        creativity: number;
    };
    feedback: {
        good: LocalizedText;
        improvement: LocalizedText;
    };
}

// Reuse the helper from photoAnalysis or duplicate it to avoid circular deps if needed
// For simplicity, duplicating the helper here as it's small
async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.split(',')[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type
                }
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Compute SHA-256 hash of base64 string for caching
async function computeImageHash(base64: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(base64);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function evaluatePhoto(file: File): Promise<ScoringResult> {
    const model = getGeminiModel();

    if (!model) {
        throw new Error("Gemini API Key is missing");
    }

    const imagePart = await fileToGenerativePart(file);

    let cacheKey: string | null = null;
    try {
        // Caching Logic
        // 1. Compute Hash
        const hash = await computeImageHash(imagePart.inlineData.data);
        cacheKey = `scoring_cache_${hash}`;

        // 2. Check Cache
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            console.log("Returning cached scoring result");
            return JSON.parse(cached) as ScoringResult;
        }
    } catch (e) {
        console.warn("Caching failed or crypto not available, skipping cache.", e);
    }

    const prompt = `
    You are a world-class Photography Judge and Critic.
    Evaluate the provided image on a scale of 0 to 100 based on professional standards.

    Return a VALID JSON object with this exact structure:
    {
        "score": 85,
        "title": { "en": "The Golden Silence", "ko": "황금빛 침묵" },
        "criteria": {
            "composition": 90,
            "lighting": 80,
            "creativity": 85
        },
        "feedback": {
            "good": { 
                "en": "Excellent use of the rule of thirds...", 
                "ko": "3분할 법칙을 아주 잘 활용했습니다..." 
            },
            "improvement": { 
                "en": "The shadows are a bit too deep...", 
                "ko": "그림자가 너무 짙어서 디테일이..." 
            }
        }
    }
    
    CRITERIA FOR SCORING:
    - 90-100: Masterpiece level.
    - 80-89: Professional quality.
    - 70-79: Good amateur shot.
    - 60-69: Needs improvement but okay.
    - 0-59: Poor execution.

    Do not use markdown. Just return the JSON.
    `;

    try {
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedResult = JSON.parse(cleanText) as ScoringResult;

        // 3. Save to Cache
        if (cacheKey) {
            try {
                localStorage.setItem(cacheKey, JSON.stringify(parsedResult));
            } catch (e) {
                console.warn("Failed to cache scoring result", e);
            }
        }

        return parsedResult;
    } catch (error) {
        console.error("Scoring Failed:", error);
        throw new Error("Failed to evaluate photo.");
    }
}
