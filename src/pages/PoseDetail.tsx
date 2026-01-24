import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { POSES } from '@/data/poses';
import CommentSection from '@/components/CommentSection';
import { usePoseInteractions } from '@/hooks/usePoseInteractions';
import styles from './PoseDetail.module.css';

export default function PoseDetailPage() {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const pose = POSES.find((p) => p.id === id);

    // Always call hooks at the top level
    const { likes, isLiked, toggleLike, comments, addComment, deleteComment } = usePoseInteractions(id || '');

    if (!pose) {
        return <div className={styles.notFound}>Pose not found</div>;
    }

    return (
        <main className={styles.container}>
            <Link to="/poses" className={styles.backLink}>{t('poses.back')}</Link>

            <div className={styles.contentGrid}>
                {/* Visual Section */}
                <div className={styles.visualColumn}>
                    <div className={styles.imageWrapper}>
                        <img src={pose.imageUrl} alt={pose.title} className={styles.mainImage} />

                        {/* Camera Grid Overlay */}
                        <div className={styles.gridOverlay}></div>
                        <div className={styles.overlayLabel}>{t('poses.guide_view')}</div>
                    </div>
                </div>

                {/* Instruction Section */}
                <div className={styles.instructionColumn}>
                    <span className={styles.category}>{pose.category}</span>
                    <div className={styles.titleRow}>
                        <h1 className={styles.title}>{pose.title}</h1>
                        <button
                            className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
                            onClick={toggleLike}
                        >
                            {isLiked ? '❤️' : '🤍'} {likes}
                        </button>
                    </div>
                    <p className={styles.description}>{pose.description}</p>

                    <div className={styles.tipsSection}>
                        <h2 className={styles.sectionTitle}>{t('poses.director_notes')}</h2>
                        <ul className={styles.tipList}>
                            {pose.tips.map((tip, index) => (
                                <li key={index} className={styles.tipItem}>
                                    <span className={styles.tipNumber}>{index + 1}</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.actionArea}>
                        <button className={styles.practiceBtn}>{t('poses.practice')}</button>
                    </div>

                    <CommentSection
                        comments={comments}
                        onAddComment={addComment}
                        onDeleteComment={deleteComment}
                    />
                </div>
            </div>
        </main>
    );
}
