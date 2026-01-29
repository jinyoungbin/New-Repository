import { getGeminiModel } from './gemini';

export interface LocalizedText {
    en: string;
    ko: string;
    [key: string]: string;
}

export interface AnalysisResult {
    lighting: {
        type: LocalizedText;
        direction: LocalizedText;
        timeOfDay: LocalizedText;
    };
    camera: {
        angle: LocalizedText;
        shotSize: LocalizedText;
    };
    pose: LocalizedText;
    tips: LocalizedText;
}

// Helper to convert file/blob to generative part
async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            // Remove "data:image/jpeg;base64," prefix
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

export async function analyzePhoto(file: File): Promise<AnalysisResult> {
    const model = getGeminiModel();

    if (!model) {
        throw new Error("Gemini API Key is missing");
    }

    const imagePart = await fileToGenerativePart(file);

    // Cloud Caching (Simulation via LocalStorage for now)
    // 1. Compute Hash of the image data
    const hash = await computeImageHash(imagePart.inlineData.data);
    const cacheKey = `analysis_cache_${hash}`;

    // 2. Check Cache
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        console.log("Returning cached analysis result");
        return JSON.parse(cached) as AnalysisResult;
    }

    const prompt = `
    You are a professional photography instructor. 
    Analyze the provided image and reverse-engineer how it was taken.
    
    IMPORTANT: You must provide ALL text values in BOTH English (en) and Korean (ko).
    
    Return the result as a VALID JSON object (no markdown formatting, just plain JSON) with the following specific structure:
    {
        "lighting": {
            "type": { "en": "Natural Soft", "ko": "부드러운 자연광" },
            "direction": { "en": "Backlit", "ko": "역광" },
            "timeOfDay": { "en": "Golden Hour", "ko": "골든 아워" }
        },
        "camera": {
            "angle": { "en": "Low Angle", "ko": "로우 앵글" },
            "shotSize": { "en": "Full Body", "ko": "전신샷" }
        },
        "pose": { 
            "en": "Standing sideways...", 
            "ko": "측면으로 서서..." 
        },
        "tips": { 
            "en": "Lower exposure...", 
            "ko": "노출을 낮춰서..." 
        }
    }
    
    Do not wrap the response in \`\`\`json blocks. Just return the raw JSON string.
    `;

    try {
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if Gemini adds it despite instructions
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedResult = JSON.parse(cleanText) as AnalysisResult;

        // 3. Save to Cache
        try {
            localStorage.setItem(cacheKey, JSON.stringify(parsedResult));
        } catch (e) {
            console.warn("Failed to cache result (storage likely full)", e);
        }

        return parsedResult;
    } catch (error) {
        console.error("Analysis Failed:", error);
        // Fallback or rethrow
        if (error instanceof Error) {
            throw new Error(`Analysis Failed: ${error.message}`);
        }
        throw new Error("Failed to analyze photo. Unknown error.");
    }
}
