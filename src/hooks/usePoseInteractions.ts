import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
    collection,
    doc,
    onSnapshot,
    addDoc,
    setDoc,
    query,
    orderBy,
    serverTimestamp,
    getDoc
} from 'firebase/firestore';

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

    // Load Likes & Listen for updates
    useEffect(() => {
        const likesRef = doc(db, 'likes', poseId);

        // Listen to likes count
        const unsubscribe = onSnapshot(likesRef, (doc) => {
            if (doc.exists()) {
                setLikes(doc.data().count || 0);
            }
        });

        // Check if I liked locally (Simulated "My Like" state)
        const myLike = localStorage.getItem(`my_like_${poseId}`);
        if (myLike === 'true') setIsLiked(true);

        return () => unsubscribe();
    }, [poseId]);

    // Load Comments & Listen for real-time updates
    useEffect(() => {
        const commentsRef = collection(db, 'poses', poseId, 'comments');
        const q = query(commentsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newComments = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    text: data.text,
                    author: data.author,
                    date: data.createdAt?.toDate().toISOString() || new Date().toISOString()
                };
            });
            setComments(newComments);
        });

        return () => unsubscribe();
    }, [poseId]);

    const toggleLike = async () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        localStorage.setItem(`my_like_${poseId}`, newIsLiked.toString());

        try {
            const likesRef = doc(db, 'likes', poseId);
            const docSnap = await getDoc(likesRef);

            let currentCount = 0;
            if (docSnap.exists()) {
                currentCount = docSnap.data().count;
            }

            const newCount = newIsLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
            await setDoc(likesRef, { count: newCount });
        } catch (e) {
            console.error("Like Error:", e);
        }
    };

    const addComment = async (text: string, author: string = 'Guest User') => {
        try {
            const commentsRef = collection(db, 'poses', poseId, 'comments');
            await addDoc(commentsRef, {
                text,
                author,
                createdAt: serverTimestamp()
            });
        } catch (e) {
            console.error("Comment Error:", e);
        }
    };

    const deleteComment = async (commentId: string) => {
        console.log("Delete not implemented for security safety in prototype");
        setComments(prev => prev.filter(c => c.id !== commentId));
    };

    return { likes, isLiked, toggleLike, comments, addComment, deleteComment };
}
