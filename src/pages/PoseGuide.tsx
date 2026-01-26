import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
// import { analyzeVibe } from '@/lib/aiGuide';
import { PoseTemplate } from '@/data/poseTemplates';
import styles from './PoseGuide.module.css';

type Step = 'upload' | 'vibe' | 'result';

export default function PoseGuide() {
    const { t } = useTranslation();
    const [step, setStep] = useState<Step>('upload');
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [vibeInput, setVibeInput] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<PoseTemplate | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);

    // Interactive State
    const [guidePos, setGuidePos] = useState({ x: 50, y: 50 }); // % from top/left
    const [guideScale, setGuideScale] = useState(1);
    const dragRef = useRef<{ startX: number, startY: number, initialPos: { x: number, y: number } } | null>(null);

    // Camera & Leveler State
    const [isCameraMode, setIsCameraMode] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [orientation, setOrientation] = useState({ beta: 0, gamma: 0 }); // beta=tilt, gamma=left/right

    // --- Interaction Handlers ---
    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

        dragRef.current = {
            startX: clientX,
            startY: clientY,
            initialPos: { ...guidePos }
        };
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!dragRef.current) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

        const deltaX = clientX - dragRef.current.startX;
        const deltaY = clientY - dragRef.current.startY;

        setGuidePos({
            x: dragRef.current.initialPos.x + (deltaX * 0.2),
            y: dragRef.current.initialPos.y + (deltaY * 0.2)
        });
    };

    const handleTouchEnd = () => {
        dragRef.current = null;
    };

    const adjustScale = (delta: number) => {
        setGuideScale(prev => Math.max(0.5, Math.min(2.0, prev + delta)));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImageSrc(ev.target?.result as string);
                setIsCameraMode(false);
                setStep('vibe');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    const startCamera = async () => {
        setIsCameraMode(true);
        setStep('vibe'); // Skip straight to vibe/result flow or handle differently
        // Wait for video element
    };

    // Camera Effect
    useEffect(() => {
        if (isCameraMode && step === 'result' && videoRef.current) {
            navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' } // Rear camera usually
            })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }
                })
                .catch(err => {
                    console.error("Camera access denied:", err);
                    alert("Could not access camera. Please allow permissions.");
                    setIsCameraMode(false);
                });
        }

        return () => {
            // Cleanup stream
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isCameraMode, step]);

    // Orientation Logic
    useEffect(() => {
        const handleOrientation = (event: DeviceOrientationEvent) => {
            setOrientation({
                beta: event.beta || 0,   // Front/Back tilt (-180 to 180). 90 is upright.
                gamma: event.gamma || 0  // Left/Right tilt (-90 to 90). 0 is flat.
            });
        };

        if (isCameraMode) {
            window.addEventListener('deviceorientation', handleOrientation);
        }
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [isCameraMode]);

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(videoRef.current, 0, 0);
            setImageSrc(canvas.toDataURL('image/jpeg'));
            setIsCameraMode(false); // Stop camera, show captured image
            // Keep template and overlay
        }
    };

    const generateGuide = async () => {
        // If in camera mode but no vibe, just pick random? Or forcing user to input first.
        if (!vibeInput.trim()) return;
        setIsLoading(true);
        try {
            // If camera mode, we don't have an image to analyze yet, so we just use text
            // Or we could capture a frame? Let's just use text for now.
            const template = await import('@/lib/aiGuide').then(m => m.analyzeVibeWithGemini(vibeInput, isCameraMode ? null : imageSrc));
            setSelectedTemplate(template);
            setStep('result');
        } catch (e) {
            console.error(e);
            alert("Something went wrong with AI. Trying fallback.");
        } finally {
            setIsLoading(false);
        }
    };

    const quickSelect = (category: string) => {
        setVibeInput(t(`categories.${category}`, category));
    };

    const reset = () => {
        setStep('upload');
        setImageSrc(null);
        setIsCameraMode(false);
        setVibeInput('');
        setSelectedTemplate(null);
    };

    // Helper to check level
    const isLevel = Math.abs(orientation.gamma) < 5 && (orientation.beta > 80 && orientation.beta < 100);

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>AI Pose Director</h1>

            {step === 'upload' && (
                <div className={styles.stepContainer}>
                    <div className={styles.uploadBox} onClick={handleBoxClick}>
                        <span className={styles.iconLarge}>📸</span>
                        <p>Upload Photo</p>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className={styles.hiddenInput}
                            onChange={handleFileChange}
                        />
                    </div>

                    <p style={{ margin: '20px 0' }}>OR</p>

                    <button className={styles.primaryBtn} style={{ width: '100%', padding: '20px' }} onClick={startCamera}>
                        🎥 Open Camera Mode
                    </button>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginTop: 10 }}>Best for having a friend take your photo</p>
                </div>
            )}

            {step === 'vibe' && (
                <div className={styles.stepContainer}>
                    {isCameraMode ? (
                        <div style={{ background: '#222', padding: 20, borderRadius: 10, marginBottom: 20 }}>
                            <p>📸 Camera Mode Active</p>
                        </div>
                    ) : (
                        imageSrc && <img src={imageSrc} alt="Background Preview" className={styles.previewImage} />
                    )}

                    <p>What kind of vibe is this?</p>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            className={styles.textInput}
                            placeholder="e.g. happy couple, professional business..."
                            value={vibeInput}
                            onChange={(e) => setVibeInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && generateGuide()}
                        />
                        <button className={styles.generateBtn} onClick={generateGuide} disabled={isLoading}>
                            {isLoading ? 'Thinking... 🧠' : '✨ Go'}
                        </button>
                    </div>

                    <div className={styles.chips}>
                        {['Casual', 'Professional', 'Travel', 'Creative'].map(cat => (
                            <button key={cat} className={styles.chip} onClick={() => quickSelect(cat)}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'result' && selectedTemplate && (
                <div className={styles.stepContainer}>
                    {/* Instructions */}
                    {!isCameraMode && <p>Try this: <strong>{selectedTemplate.title}</strong></p>}

                    <div className={styles.overlayContainer}>
                        {isCameraMode ? (
                            <video
                                ref={videoRef}
                                className={styles.videoFeed}
                                autoPlay
                                playsInline
                                muted
                            />
                        ) : (
                            imageSrc && <img src={imageSrc} alt="Background" className={styles.baseImage} />
                        )}

                        {/* Leveler Indicator (Only in Camera Mode) */}
                        {isCameraMode && (
                            <div className={styles.levelerContainer}>
                                <div className={`${styles.levelIndicator} ${isLevel ? styles.levelGood : styles.levelBad}`}>
                                    <span>{isLevel ? '🟢 Perfect Level' : '🔴 Tilt Phone'}</span>
                                </div>
                                {/* <div style={{fontSize: '10px'}}>{Math.round(orientation.beta)}° / {Math.round(orientation.gamma)}°</div> */}
                            </div>
                        )}

                        {/* Feet Guide Line */}
                        {isCameraMode && (
                            <div className={styles.feetLine}>
                                <span className={styles.feetText}>Match Feet Here</span>
                            </div>
                        )}

                        {/* The Overlay */}
                        <div
                            className={styles.dummyTouchArea}
                            onMouseDown={handleTouchStart}
                            onMouseMove={handleTouchMove}
                            onMouseUp={handleTouchEnd}
                            onMouseLeave={handleTouchEnd}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <svg
                                className={styles.guideOverlay}
                                viewBox="0 0 100 200"
                                preserveAspectRatio="none"
                                style={{
                                    left: `${guidePos.x}%`,
                                    top: `${guidePos.y}%`,
                                    transform: `translate(-50%, -50%) scale(${guideScale})`
                                }}
                            >
                                <path d={selectedTemplate.svgPath} className={styles.guidePath} />
                            </svg>
                        </div>
                    </div>

                    <div className={styles.scaleControls}>
                        <button onClick={() => adjustScale(-0.1)}>-</button>
                        <span>Size</span>
                        <button onClick={() => adjustScale(0.1)}>+</button>
                    </div>

                    <div className={styles.controls}>
                        <button className={styles.actionBtn} onClick={reset}>New Photo</button>
                        {isCameraMode ? (
                            <button className={styles.shutterBtn} onClick={capturePhoto}></button>
                        ) : (
                            <button className={`${styles.actionBtn} ${styles.primaryBtn}`} onClick={() => alert('Saved!')}>Save</button>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
