import { Link } from 'react-router-dom';
import { Pose } from '@/data/poses';
import styles from './PoseCard.module.css';

interface PoseCardProps {
    pose: Pose;
}

export default function PoseCard({ pose }: PoseCardProps) {
    return (
        <Link to={`/poses/${pose.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={pose.imageUrl}
                    alt={pose.title}
                    className={styles.image}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <span className={styles.category}>{pose.category}</span>
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{pose.title}</h3>
                    <span className={styles.difficulty}>{pose.difficulty}</span>
                </div>
                <p className={styles.description}>{pose.description}</p>
                <div className={styles.tags}>
                    {pose.tags.map(tag => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
