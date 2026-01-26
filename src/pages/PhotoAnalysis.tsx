import { useState, useRef, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { analyzePhoto, AnalysisResult, LocalizedText } from '@/lib/photoAnalysis';
import { useAuth } from '@/context/AuthContext';
import { saveAnalysisResult, saveCustomPose } from '@/lib/userData';
import { Pose } from '@/data/poses';
import FeatureNav from '@/components/FeatureNav';
import styles from './PhotoAnalysis.module.css';

export default function PhotoAnalysis() {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Helper to extract text based on current language
    const getText = (textObj: LocalizedText | string) => {
        if (typeof textObj === 'string') return textObj;
        const lang = i18n.language.startsWith('ko') ? 'ko' : 'en';
        return textObj[lang] || textObj['en'] || '';
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        setFile(file);
        setResult(null);
        setError(null);
        const reader = new FileReader();
        reader.onload = (ev) => setImageSrc(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files?.[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);
        try {
            // We no longer pass lang to the API, as it returns ALL langs now
            const data = await analyzePhoto(file);
            setResult(data);

            if (user?.id && imageSrc) {
                await saveAnalysisResult(user.id, data, imageSrc);
            }
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to analyze. check console for details.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAsPose = () => {
        console.log("Save button clicked");
        if (!user?.id) {
            console.error("No user ID found");
            alert("Please login to save poses.");
            return;
        }
        if (!result || !imageSrc) {
            console.error("Missing result or image");
            return;
        }

        // 1. Convert AnalysisResult to Pose
        const lang = i18n.language.startsWith('ko') ? 'ko' : 'en';

        // Helper to get text
        const tVal = (obj: any) => obj[lang] || obj['en'] || obj;

        const newPose: Pose = {
            id: `custom-${Date.now()}`,
            title: tVal(result.pose), // Use the pose description as the title
            description: `${tVal(result.lighting.type)}, ${tVal(result.camera.angle)}`,
            category: '크리에이티브', // Default category for custom poses
            tags: ['My Analysis', 'Custom'],
            imageUrl: imageSrc, // Save the image itself (Data URL)
            difficulty: '중급',
            tips: [
                tVal(result.tips),
                `Lighting: ${tVal(result.lighting.direction)}`,
                `Angle: ${tVal(result.camera.angle)}`
            ]
        };

        // 2. Save
        saveCustomPose(user.id, newPose);
        alert(t('analysis.saved_as_pose', 'Saved to your Poses!'));
    };



    // ... (imports)

    // ...

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <FeatureNav />
                <h1 className={styles.title}>{t('analysis.title')}</h1>
                <p className={styles.subtitle}>{t('analysis.subtitle')}</p>
            </header>

            <div className={`${styles.contentGrid} ${!result ? styles.singleColumn : ''}`}>
                {/* Left: Upload Area */}
                <div
                    className={`${styles.uploadSection} ${imageSrc ? styles.hasImage : ''}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    {imageSrc ? (
                        <>
                            <img src={imageSrc} alt="Target" className={styles.previewImage} />
                            {isLoading && (
                                <div className={styles.loadingOverlay}>
                                    <div className={styles.spinner}></div>
                                    <p>{t('analysis.analyzing')}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.dropZone} onClick={() => fileInputRef.current?.click()}>
                            <span style={{ fontSize: '48px', marginBottom: '20px' }}>📂</span>
                            <h3>{t('analysis.click_drag')}</h3>
                            <p style={{ color: '#666', marginTop: '10px' }}>{t('analysis.upload_desc')}</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className={styles.hiddenInput}
                                accept="image/*"
                            />
                        </div>
                    )}

                    {imageSrc && !isLoading && !result && (
                        <button className={styles.analyzeBtn} onClick={handleAnalyze}>
                            {t('analysis.analyze_btn')}
                        </button>
                    )}

                    {error && <p style={{ color: '#ff6b6b', marginTop: 20 }}>{error}</p>}
                </div>

                {/* Right: Result Card */}
                {result && (
                    <div className={styles.resultSection}>
                        <div className={styles.recipeTitle}>
                            {t('analysis.recipe_title')}
                        </div>

                        <div className={styles.recipeGrid}>
                            {/* Lighting */}
                            <div className={styles.recipeItem}>
                                <div className={styles.iconBox}>☀️</div>
                                <div className={styles.infoBox}>
                                    <span className={styles.label}>{t('analysis.lighting')}</span>
                                    <div className={styles.value}>{getText(result.lighting.type)}</div>
                                    <div className={styles.subValue}>
                                        {getText(result.lighting.direction)} • {getText(result.lighting.timeOfDay)}
                                    </div>
                                </div>
                            </div>

                            {/* Camera */}
                            <div className={styles.recipeItem}>
                                <div className={styles.iconBox}>📷</div>
                                <div className={styles.infoBox}>
                                    <span className={styles.label}>{t('analysis.angle')}</span>
                                    <div className={styles.value}>{getText(result.camera.angle)}</div>
                                    <div className={styles.subValue}>{getText(result.camera.shotSize)}</div>
                                </div>
                            </div>

                            {/* Pose */}
                            <div className={styles.recipeItem}>
                                <div className={styles.iconBox}>🧘</div>
                                <div className={styles.infoBox}>
                                    <span className={styles.label}>{t('analysis.pose')}</span>
                                    <div className={styles.value} style={{ fontSize: '1rem' }}>
                                        {getText(result.pose)}
                                    </div>
                                </div>
                            </div>

                            {/* Tips */}
                            <div className={styles.tipBox}>
                                <span className={styles.label} style={{ color: '#4ECDC4' }}>{t('analysis.tip')}</span>
                                <p className={styles.tipText}>"{getText(result.tips)}"</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                            <button
                                className={styles.analyzeBtn}
                                style={{ flex: 1, background: '#333' }}
                                onClick={() => {
                                    setImageSrc(null);
                                    setFile(null);
                                    setResult(null);
                                }}
                            >
                                {t('analysis.new_photo')}
                            </button>
                            <button
                                onClick={handleSaveAsPose}
                                className={styles.analyzeBtn}
                                style={{ flex: 1, background: '#FF6B6B', color: 'white', border: 'none', marginLeft: '10px' }}
                            >
                                ❤️ {t('analysis.save_recipe', 'Save Recipe')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
