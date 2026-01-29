import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ARTICLES } from '@/data/articles';
import { LocalizedText } from '@/lib/photoAnalysis';
import styles from './BlogList.module.css';

export default function BlogList() {
    const { t, i18n } = useTranslation();

    const getText = (obj: LocalizedText) => {
        return obj[i18n.language] || obj['en'] || Object.values(obj)[0];
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{t('blog.title')}</h1>
                <p className={styles.subtitle}>{t('blog.subtitle')}</p>
            </header>

            <div className={styles.grid}>
                {ARTICLES.map(article => (
                    <Link to={`/blog/${article.id}`} key={article.id} className={styles.card}>
                        <img src={article.thumbnail} alt={getText(article.title)} className={styles.thumbnail} />
                        <div className={styles.content}>
                            <span className={styles.category}>{getText(article.category)}</span>
                            <h2 className={styles.cardTitle}>{getText(article.title)}</h2>
                            <p className={styles.excerpt}>{getText(article.excerpt)}</p>
                            <div className={styles.meta}>{new Date(article.date).toLocaleDateString()}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
