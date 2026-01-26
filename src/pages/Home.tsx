import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroAnimation from '@/components/HeroAnimation';
import ScoringAnimation from '@/components/ScoringAnimation';
import styles from './Home.module.css';

export default function Home() {
    const { t } = useTranslation();

    return (
        <main className={styles.main}>
            <div className={styles.splitLayout}>
                {/* Feature 1: Analysis */}
                <div className={styles.featureCol}>
                    <div className={styles.featureContent}>
                        <header className={styles.header}>
                            <h1 className={styles.title}>
                                {t('home.title_part1')}<br />
                                <span className={styles.italic}>{t('home.title_part2')}</span>
                            </h1>
                            <div style={{ marginBottom: '10px' }}>
                                <p className={styles.subtitle} style={{ marginBottom: '10px' }}>
                                    {t('home.subtitle')}
                                </p>
                                <ul className={styles.featureList} style={{ justifyContent: 'center' }}>
                                    <li>💡 {t('home.feature1')}</li>
                                    <li>📸 {t('home.feature2')}</li>
                                </ul>
                            </div>
                            <Link to="/analysis" className={styles.primaryBtn} style={{ marginTop: '20px' }}>
                                {t('home.cta_analyze')}
                            </Link>
                        </header>
                        <div className={styles.visualWrapper}>
                            <HeroAnimation />
                        </div>
                    </div>
                </div>

                {/* Feature 2: Scoring */}
                <div className={`${styles.featureCol} ${styles.altBg}`}>
                    <div className={styles.featureContent}>
                        <header className={styles.header}>
                            <h2 className={styles.title}>
                                {t('home_scoring.title_part1')}<br />
                                <span className={styles.italic}>{t('home_scoring.title_part2')}</span>
                            </h2>
                            <div>
                                <p className={styles.subtitle} style={{ marginBottom: '10px' }}>
                                    {t('home_scoring.subtitle')}
                                </p>
                                <ul className={styles.featureList} style={{ justifyContent: 'center' }}>
                                    <li>✨ {t('home_scoring.feature1')}</li>
                                    <li>📐 {t('home_scoring.feature2')}</li>
                                </ul>
                            </div>
                            <Link to="/scoring" className={styles.secondaryBtn} style={{ marginTop: '20px' }}>
                                {t('home_scoring.cta')}
                            </Link>
                        </header>
                        <div className={styles.visualWrapper}>
                            <ScoringAnimation />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
