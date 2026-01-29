import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { evaluatePhoto, ScoringResult } from '@/lib/photoScoring';
import { LocalizedText } from '@/lib/photoAnalysis';
import FeatureNav from '@/components/FeatureNav';
import styles from './PhotoScoring.module.css';
import { useAuth } from '@/context/AuthContext';
import { saveScoringResult } from '@/lib/userData';
import ShareButtons from '@/components/ShareButtons';

export default function PhotoScoring() {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<ScoringResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getText = (textObj: LocalizedText) => {
        const lang = i18n.language.startsWith('ko') ? 'ko' : 'en';
        return textObj[lang] || textObj['en'] || '';
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) processFile(e.target.files[0]);
    };

    const processFile = (file: File) => {
        setFile(file);
        setResult(null);
        const reader = new FileReader();
        reader.onload = (ev) => setImageSrc(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await evaluatePhoto(file);
            setResult(data);

            if (user?.id && imageSrc) {
                saveScoringResult(user.id, data, imageSrc);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to evaluate photo. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Animation helper for progress bars
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        if (result) {
            setTimeout(() => setAnimate(true), 100);
        } else {
            setAnimate(false);
        }
    }, [result]);

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <FeatureNav />
                <h1 className={styles.title}>{t('scoring.title', 'AI Photo Score')}</h1>
                <p className={styles.subtitle}>{t('scoring.subtitle', 'Get a professional critique in seconds.')}</p>
            </header>

            <div className={`${styles.contentGrid} ${!result ? styles.singleColumn : ''}`}>
                <div
                    className={`${styles.uploadSection} ${imageSrc ? styles.hasImage : ''}`}
                    onClick={() => !result && fileInputRef.current?.click()}
                >
                    {imageSrc ? (
                        <>
                            <img src={imageSrc} alt="Target" className={styles.previewImage} />
                            {isLoading && (
                                <div className={styles.loadingOverlay}>
                                    <div className={styles.spinner}></div>
                                    <p>{t('scoring.analyzing', 'Judging your masterpiece...')}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.dropZone}>
                            <span style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>🏆</span>
                            <h3>{t('scoring.upload_cta', 'Upload your best shot')}</h3>
                            <p style={{ color: '#888' }}>{t('scoring.upload_sub', 'Click to browse')}</p>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className={styles.hiddenInput}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                </div>
                {error && <p style={{ color: '#ff6b6b', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
            </div>

            {imageSrc && !isLoading && !result && (
                <button
                    onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
                    style={{
                        marginTop: '30px',
                        padding: '15px 40px',
                        background: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '100px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    {t('scoring.btn_evaluate', 'Get Score')}
                </button>
            )}

            {result && (
                <div className={styles.resultContainer}>
                    <div className={styles.scoreCard}>
                        <div
                            className={styles.scoreCircle}
                            style={{
                                background: `conic-gradient(#FF6B6B ${result.score * 3.6}deg, #eee 0deg)`
                            }}
                        >
                            <div className={styles.scoreInner}>
                                <div className={styles.scoreValue}>{result.score}</div>
                                <div className={styles.scoreLabel}>SCORE</div>
                            </div>
                        </div>

                        <div className={styles.scoreInfo}>
                            <h2 className={styles.photoTitle}>{getText(result.title)}</h2>
                            <div className={styles.criteriaList}>
                                {Object.entries(result.criteria).map(([key, value]) => (
                                    <div key={key} className={styles.criteriaItem}>
                                        <div className={styles.criteriaLabel} style={{ textTransform: 'capitalize' }}>{key}</div>
                                        <div className={styles.progressBarTrack}>
                                            <div
                                                className={styles.progressBarFill}
                                                style={{ width: animate ? `${value}%` : '0%' }}
                                            ></div>
                                        </div>
                                        <div className={styles.criteriaValue}>{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.feedbackGrid}>
                        <div className={`${styles.feedbackCard} ${styles.goodCard}`}>
                            <div className={styles.cardTitle}>
                                <span>👍</span> {t('scoring.good_point', 'What worked')}
                            </div>
                            <p className={styles.cardText}>{getText(result.feedback.good)}</p>
                        </div>
                        <div className={`${styles.feedbackCard} ${styles.improveCard}`}>
                            <div className={styles.cardTitle}>
                                <span>💡</span> {t('scoring.improve_point', 'How to improve')}
                            </div>
                            <p className={styles.cardText}>{getText(result.feedback.improvement)}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setImageSrc(null);
                            setFile(null);
                            setResult(null);
                        }}
                        style={{
                            marginTop: '40px',
                            width: '100%',
                            padding: '15px',
                            background: '#f0f0f0',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        {t('scoring.btn_retry', 'Evaluate Another Photo')}
                    </button>
                    <ShareButtons
                        title={`AI가 분석한 제 인생샷 점수는 ${result.score}점! 📸`}
                        description="상위 1% 포즈에 도전하세요! (내 점수 측정하기)"
                        imageUrl={`${window.location.origin}/assets/images/${result.score >= 80 ? 'tier_gold.png' : 'tier_silver.png'}`}
                        imageFile={file} // Pass the actual user file for upload
                        url={`${window.location.origin}/scoring`} // Deep link to scoring page
                    />
                </div>
            )}
        </main>
    );
}
```
