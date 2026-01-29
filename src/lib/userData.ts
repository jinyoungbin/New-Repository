import { AnalysisResult, LocalizedText } from './photoAnalysis';
import { ScoringResult } from './photoScoring';
import { Pose } from '@/data/poses';

export interface SavedAnalysis {
    id: string; // timestamp
    date: string; // ISO date
    thumbnail: string; // Base64 Data URL (resized)
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

export interface SavedScore {
    id: string; // timestamp
    date: string; // ISO date
    thumbnail: string; // Base64 Data URL (resized)
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

export interface UserData {
    id: string;
    savedPoseIds: string[];
    customPoses: Pose[];
    history: SavedAnalysis[];
    scoringHistory: SavedScore[];
}

const STORAGE_PREFIX = 'user_data_';

const getStorageKey = (userId: string) => `${STORAGE_PREFIX}${userId}`;

export const getUserData = (userId: string): UserData => {
    const key = getStorageKey(userId);
    const data = localStorage.getItem(key);

    // Default structure
    const initialData: UserData = {
        id: userId,
        savedPoseIds: [],
        customPoses: [],
        history: [],
        scoringHistory: []
    };

    if (data) {
        try {
            const parsed = JSON.parse(data);
            // Merge with defaults to ensure new fields (like customPoses) exist
            return {
                ...initialData,
                ...parsed, // Overwrite with saved data
                customPoses: parsed.customPoses || [], // Explicitly fallback if missing
                history: parsed.history || [],
                scoringHistory: parsed.scoringHistory || []
            };
        } catch (e) {
            console.error('Failed to parse user data', e);
        }
    }
    return initialData;
};

export const saveUserData = (userData: UserData) => {
    const key = getStorageKey(userData.id);
    localStorage.setItem(key, JSON.stringify(userData));
};

export const toggleSavedPose = (userId: string, poseId: string): boolean => {
    const data = getUserData(userId);
    const index = data.savedPoseIds.indexOf(poseId);
    let isSaved = false;

    if (index === -1) {
        data.savedPoseIds.push(poseId);
        isSaved = true;
    } else {
        data.savedPoseIds.splice(index, 1);
        isSaved = false;
    }

    saveUserData(data);

    // Dispatch a custom event so other components can react
    window.dispatchEvent(new CustomEvent('userDataChanged', { detail: { userId } }));

    return isSaved;
};

export const isPoseSaved = (userId: string, poseId: string): boolean => {
    const data = getUserData(userId);
    return data.savedPoseIds.includes(poseId);
};

// Helper: Create a small thumbnail from a data URL or Image source
const createThumbnail = (imageSrc: string, maxWidth: number = 100): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ratio = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * ratio;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to JPEG 70%
            } else {
                resolve(''); // Fail gracefully
            }
        };
        img.onerror = () => resolve('');
        img.src = imageSrc;
    });
};

export const saveAnalysisResult = async (userId: string, result: AnalysisResult, imageSrc: string) => {
    const data = getUserData(userId);
    const thumbnail = await createThumbnail(imageSrc);

    // Safe helper to ensure we have a LocalizedText structure even if input is string (backward compat logic)
    const normalizeLocalized = (val: LocalizedText | string): LocalizedText => {
        if (typeof val === 'string') return { en: val, ko: val };
        return val;
    };

    // Create a structured record
    const record: SavedAnalysis = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        thumbnail: thumbnail,
        lighting: {
            type: normalizeLocalized(result.lighting.type),
            direction: normalizeLocalized(result.lighting.direction),
            timeOfDay: normalizeLocalized(result.lighting.timeOfDay),
        },
        camera: {
            angle: normalizeLocalized(result.camera.angle),
            shotSize: normalizeLocalized(result.camera.shotSize),
        },
        pose: normalizeLocalized(result.pose),
        tips: normalizeLocalized(result.tips)
    };

    // Add to beginning, keep max 20
    data.history.unshift(record);
    if (data.history.length > 20) {
        data.history = data.history.slice(0, 20);
    }

    saveUserData(data);
    window.dispatchEvent(new CustomEvent('userDataChanged', { detail: { userId } }));
};

export const saveCustomPose = (userId: string, pose: Pose) => {
    const data = getUserData(userId);
    data.customPoses.unshift(pose);
    saveUserData(data);
    window.dispatchEvent(new CustomEvent('userDataChanged', { detail: { userId } }));
};

export const deleteAnalysisResult = (userId: string, resultId: string) => {
    const data = getUserData(userId);
    data.history = data.history.filter(item => item.id !== resultId);
    saveUserData(data);
    window.dispatchEvent(new CustomEvent('userDataChanged', { detail: { userId } }));
};

export const deleteCustomPose = (userId: string, poseId: string) => {
    const data = getUserData(userId);
    data.customPoses = data.customPoses.filter(item => item.id !== poseId);
    saveUserData(data);
    window.dispatchEvent(new CustomEvent('userDataChanged', { detail: { userId } }));
};

export const saveScoringResult = async (userId: string, result: ScoringResult, imageSrc: string) => {
    const data = getUserData(userId);
    const thumbnail = await createThumbnail(imageSrc);

    const record: SavedScore = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        thumbnail: thumbnail,
        score: result.score,
        title: result.title,
        criteria: result.criteria,
        feedback: result.feedback
    };

    data.scoringHistory = data.scoringHistory || [];
    data.scoringHistory.unshift(record);

    // Limit to last 20
    if (data.scoringHistory.length > 20) {
        data.scoringHistory = data.scoringHistory.slice(0, 20);
    }

    saveUserData(data);
    window.dispatchEvent(new CustomEvent('userDataChanged', { detail: { userId } }));
};

export const deleteScoringResult = (userId: string, resultId: string) => {
    const data = getUserData(userId);
    if (!data.scoringHistory) return;

    data.scoringHistory = data.scoringHistory.filter(item => item.id !== resultId);
    saveUserData(data);
    window.dispatchEvent(new CustomEvent('userDataChanged', { detail: { userId } }));
};
