import styles from './HeroAnimation.module.css';

export default function HeroAnimation() {
    return (
        <div className={styles.container}>
            <div className={styles.bgImage}></div>

            {/* The Scanner */}
            <div className={styles.scanLine}></div>
            <div className={styles.scanShader}></div>

            {/* Target Reticle */}
            <div className={styles.targetBox}>
                <div className={`${styles.targetCorner} ${styles.tl}`}></div>
                <div className={`${styles.targetCorner} ${styles.tr}`}></div>
                <div className={`${styles.targetCorner} ${styles.bl}`}></div>
                <div className={`${styles.targetCorner} ${styles.br}`}></div>
            </div>

            {/* Floating Data Bubbles */}
            <div className={styles.dataContainer}>
                <div className={`${styles.bubble} ${styles.b1}`}>
                    <span className={styles.icon}>☀️</span> Lighting: Golden Hour
                </div>
                <div className={`${styles.bubble} ${styles.b2}`}>
                    <span className={styles.icon}>📷</span> Angle: Low Shot
                </div>
                <div className={`${styles.bubble} ${styles.b3}`}>
                    <span className={styles.icon}>✨</span> Advice: Backlight
                </div>
            </div>

            <div className={styles.scanText}>ANALYZING SCENE...</div>
        </div>
    );
}
