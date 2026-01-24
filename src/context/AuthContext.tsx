import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    nickname: string;
    profileImage: string;
    isKakao: boolean;
}

interface AuthContextType {
    user: User | null;
    loginWithKakao: () => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage on initial load
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const loginWithKakao = async () => {
        return new Promise<void>((resolve) => {
            // Simulate network request
            setTimeout(() => {
                const mockUser: User = {
                    nickname: '김카카오', // Randomized or fixed for demo
                    profileImage: 'https://placehold.co/100x100/FEE500/000000?text=K',
                    isKakao: true
                };
                setUser(mockUser);
                localStorage.setItem('auth_user', JSON.stringify(mockUser));
                resolve();
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_user');
    };

    return (
        <AuthContext.Provider value={{ user, loginWithKakao, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
