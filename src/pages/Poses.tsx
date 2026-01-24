import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { POSES } from '@/data/poses';
import PoseCard from '@/components/PoseCard';
import styles from './Poses.module.css';

const CATEGORIES = ['All', 'Casual', 'Professional', 'Travel', 'Event', 'Creative'];

const CATEGORY_MAP: Record<string, string> = {
    'Casual': '캐주얼',
    'Professional': '비즈니스',
    'Travel': '여행',
    'Event': '커플/이벤트',
    'Creative': '크리에이티브'
};

export default function PosesPage() {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPoses = selectedCategory === 'All'
        ? POSES
        : POSES.filter(pose => pose.category === CATEGORY_MAP[selectedCategory]);

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{t('poses.title')}</h1>
                <p className={styles.subtitle}>{t('poses.subtitle')}</p>
            </header>

            <div className={styles.filters}>
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {t(`poses.filter.${category}`)}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredPoses.map(pose => (
                    <PoseCard key={pose.id} pose={pose} />
                ))}
            </div>
        </main>
    );
}
