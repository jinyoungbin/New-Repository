import styles from './ScoringAnimation.module.css';

export default function ScoringAnimation() {
    return (
        <div className={styles.container}>
            <div className={styles.imagePlaceholder}>
                <div className={styles.scanLine}></div>
                <img
                    src="/images/pose-professional.png"
                    alt="Scoring Example"
                    className={styles.exampleImage}
                />
            </div>

            <div className={styles.scoreBadge}>
                92
            </div>

            <div className={styles.scoreDetails}>
                <div className={styles.scoreBar}>
                    <div className={styles.scoreFill} style={{ '--score': '92%' } as any}></div>
                </div>
                <div className={styles.scoreBar}>
                    <div className={styles.scoreFill} style={{ '--score': '85%', background: '#FFD93D', animationDelay: '1.4s' } as any}></div>
                </div>
                <div className={styles.scoreBar}>
                    <div className={styles.scoreFill} style={{ '--score': '78%', background: '#FF6B6B', animationDelay: '1.6s' } as any}></div>
                </div>
            </div>
        </div>
    );
}
