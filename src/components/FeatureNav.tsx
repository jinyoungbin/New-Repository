import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './FeatureNav.module.css';

export default function FeatureNav() {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <nav className={styles.nav}>
            <Link
                to="/analysis"
                className={`${styles.link} ${location.pathname === '/analysis' ? styles.active : ''}`}
            >
                {t('analysis.title', 'Photo Analysis')}
            </Link>
            <Link
                to="/scoring"
                className={`${styles.link} ${location.pathname === '/scoring' ? styles.active : ''}`}
            >
                {/* Fallback hardcoded for now until scoring.title key is verified */}
                {t('scoring.title', 'AI Photo Score')}
            </Link>
        </nav>
    );
}
