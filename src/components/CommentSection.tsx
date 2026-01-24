import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Comment } from '@/hooks/usePoseInteractions';
import styles from './CommentSection.module.css';

interface CommentSectionProps {
    comments: Comment[];
    onAddComment: (text: string, author: string) => void;
    onDeleteComment: (id: string) => void;
}

export default function CommentSection({ comments, onAddComment, onDeleteComment }: CommentSectionProps) {
    const { user } = useAuth();
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        const authorName = user ? user.nickname : 'Guest User';
        onAddComment(text, authorName);
        setText('');
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Comments ({comments.length})</h3>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Share your thoughts..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className={styles.submitBtn} disabled={!text.trim()}>
                    Post
                </button>
            </form>

            <div className={styles.commentList}>
                {comments.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                        <div className={styles.avatar}>
                            {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.commentContent}>
                            <div className={styles.header}>
                                <span className={styles.author}>{comment.author}</span>
                                <span className={styles.date}>
                                    {new Date(comment.date).toLocaleDateString()}
                                </span>
                            </div>
                            <p className={styles.text}>{comment.text}</p>
                            {(comment.author === 'Guest User' || (user && comment.author === user.nickname)) && (
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => onDeleteComment(comment.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
