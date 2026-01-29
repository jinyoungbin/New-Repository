import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ARTICLES } from '@/data/articles';
import { LocalizedText } from '@/lib/photoAnalysis';
import styles from './BlogDetail.module.css';
import AdUnit from '@/components/AdUnit';

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const article = ARTICLES.find(a => a.id === id);

    if (!article) {
        return <Navigate to="/blog" replace />;
    }

    const getText = (obj: LocalizedText) => {
        return obj[i18n.language] || obj['en'] || Object.values(obj)[0];
    };

    return (
        <main className={styles.articleContainer}>
            <Link to="/blog" className={styles.backBtn}>{t('blog.back')}</Link>

            <header className={styles.metaHeader}>
                <span className={styles.category}>{getText(article.category)}</span>
                <h1 className={styles.title}>{getText(article.title)}</h1>
                <div className={styles.date}>{new Date(article.date).toLocaleDateString()}</div>
            </header>

            <img src={article.thumbnail} alt={getText(article.title)} className={styles.headerImage} />

            <article
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: getText(article.content) }}
            />

            <div style={{ marginTop: 50 }}>
                {/* Ad unit at the end of content - Good for AdSense */}
                <AdUnit slotId="blog-bottom-slot" format="auto" />
            </div>
        </main>
    );
}
