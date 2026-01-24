import { useState, useEffect } from 'react';

export interface Comment {
    id: string;
    text: string;
    date: string;
    author: string;
}

export function usePoseInteractions(poseId: string) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const storedLikes = localStorage.getItem(`pose_likes_${poseId}`);
        const storedIsLiked = localStorage.getItem(`pose_is_liked_${poseId}`);
        const storedComments = localStorage.getItem(`pose_comments_${poseId}`);

        if (storedLikes) setLikes(parseInt(storedLikes));
        if (storedIsLiked === 'true') setIsLiked(true);
        if (storedComments) setComments(JSON.parse(storedComments));
        else {
            // Default/Mock comments for demo
            setComments([
                { id: '1', author: 'CameraLover', text: 'Totally tried this at a cafe yesterday!', date: new Date(Date.now() - 86400000).toISOString() },
            ]);
        }
    }, [poseId]);

    const toggleLike = () => {
        const newIsLiked = !isLiked;
        const newLikes = newIsLiked ? likes + 1 : likes - 1;

        setIsLiked(newIsLiked);
        setLikes(newLikes);

        localStorage.setItem(`pose_likes_${poseId}`, newLikes.toString());
        localStorage.setItem(`pose_is_liked_${poseId}`, newIsLiked.toString());
    };

    const addComment = (text: string, author: string = 'Guest User') => {
        const newComment: Comment = {
            id: Date.now().toString(),
            text,
            date: new Date().toISOString(),
            author: author
        };

        const newComments = [newComment, ...comments];
        setComments(newComments);
        localStorage.setItem(`pose_comments_${poseId}`, JSON.stringify(newComments));
    };

    const deleteComment = (commentId: string) => {
        const newComments = comments.filter(c => c.id !== commentId);
        setComments(newComments);
        localStorage.setItem(`pose_comments_${poseId}`, JSON.stringify(newComments));
    }

    return { likes, isLiked, toggleLike, comments, addComment, deleteComment };
}
