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
        return new Promise<void>((resolve, reject) => {
            if (!window.Kakao) {
                console.error('Kakao SDK not loaded');
                return;
            }

            window.Kakao.Auth.login({
                success: function () {
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        success: function (res: any) {
                            const kakaoAccount = res.kakao_account;
                            const newUser: User = {
                                nickname: kakaoAccount.profile.nickname,
                                profileImage: kakaoAccount.profile.thumbnail_image_url || 'https://placehold.co/100x100/FEE500/000000?text=K',
                                isKakao: true
                            };
                            setUser(newUser);
                            localStorage.setItem('auth_user', JSON.stringify(newUser));
                            resolve();
                        },
                        fail: function (error: any) {
                            console.error('Failed to get user info', error);
                            reject(error);
                        },
                    });
                },
                fail: function (err: any) {
                    console.error('Login Failed', err);
                    reject(err);
                },
            });
        });
    };

    const logout = () => {
        if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
            window.Kakao.Auth.logout(() => {
                console.log('Kakao logout success');
            });
        }
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
