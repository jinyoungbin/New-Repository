import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.css';

export default function Home() {
    const { t } = useTranslation();

    return (
        <main className={styles.main}>
            <div className={styles.heroContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        {t('home.title_line1')}<span className={styles.italic}>e</span> <br />
                        {t('home.title_line2')}
                    </h1>
                    <p className={styles.subtitle}>
                        {t('home.subtitle').split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>
                </header>

                <div className={styles.actions}>
                    <Link to="/poses" className={styles.primaryBtn}>
                        {t('nav.explore')}
                    </Link>
                    <Link to="/consult" className={styles.secondaryBtn}>
                        {t('nav.director')}
                    </Link>
                </div>
            </div>

            <div className={styles.heroImageContainer}>
                <img
                    src="/images/pose-confidence.png"
                    alt="Confidence Pose"
                    className={styles.heroImage}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </main>
    );
}
