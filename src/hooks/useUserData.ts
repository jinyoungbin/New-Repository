import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserData, toggleSavedPose, UserData } from '@/lib/userData';

export function useUserData() {
    const { user } = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);

    const refreshData = useCallback(() => {
        if (user?.id) {
            setUserData(getUserData(user.id));
        } else {
            setUserData(null);
        }
    }, [user?.id]);

    useEffect(() => {
        refreshData();

        const handleStorageChange = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail?.userId === user?.id) {
                refreshData();
            }
        };

        window.addEventListener('userDataChanged', handleStorageChange);
        return () => {
            window.removeEventListener('userDataChanged', handleStorageChange);
        };
    }, [refreshData, user?.id]);

    const togglePose = (poseId: string) => {
        if (!user?.id) return false;
        return toggleSavedPose(user.id, poseId);
    };

    const checkIsSaved = (poseId: string) => {
        if (!user?.id || !userData) return false;
        return userData.savedPoseIds.includes(poseId);
    };

    return {
        userData,
        togglePose,
        checkIsSaved,
        refreshData
    };
}
