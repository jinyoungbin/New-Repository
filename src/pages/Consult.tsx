import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { POSES, Pose } from '@/data/poses';
import PoseCard from '@/components/PoseCard';
import styles from './Consult.module.css';

export default function ConsultPage() {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [recommendations, setRecommendations] = useState<Pose[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsAnalyzing(true);
        setHasSearched(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            // Mock Recommendation Engine: Simple keyword matching
            const keywords = input.toLowerCase().split(' ');

            const scores = POSES.map(pose => {
                let score = 0;
                const text = `${pose.title} ${pose.description} ${pose.category} ${pose.tags.join(' ')}`.toLowerCase();

                keywords.forEach(word => {
                    if (word.length > 2 && text.includes(word)) score += 1;
                });
                return { pose, score };
            });

            // Filter by relevance (score > 0) or fallback to top rated if no match
            const sorted = scores.sort((a, b) => b.score - a.score);

            const results = sorted[0].score > 0
                ? sorted.filter(item => item.score > 0).map(item => item.pose)
                : POSES.filter(p => p.difficulty === '초급');

            setRecommendations(results.slice(0, 3));
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <main className={styles.container}>
            <div className={styles.formSection}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{t('consult.title')}</h1>
                    <p className={styles.subtitle}>{t('consult.subtitle')}</p>
                </header>

                <form onSubmit={handleAnalyze} className={styles.form}>
                    <div className={styles.uploadSection}>
                        <label className={styles.uploadLabel}>
                            <input type="file" className={styles.fileInput} accept="image/*" />
                            <span className={styles.uploadText}>{t('consult.upload_text')}</span>
                        </label>
                    </div>

                    <textarea
                        className={styles.textarea}
                        placeholder={t('consult.input_placeholder')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={4}
                    />
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isAnalyzing || !input.trim()}
                    >
                        {isAnalyzing ? t('consult.analyzing') : t('consult.analyze_btn')}
                    </button>
                </form>
            </div>

            {hasSearched && (
                <div className={styles.resultsSection}>
                    <h2 className={styles.resultsTitle}>
                        {isAnalyzing ? t('consult.thinking') : t('consult.results_title')}
                    </h2>

                    <div className={styles.grid}>
                        {!isAnalyzing && recommendations.map(pose => (
                            <PoseCard key={pose.id} pose={pose} />
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
