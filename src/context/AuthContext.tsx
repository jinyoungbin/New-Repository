import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
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
        try {
            // Check local storage on initial load
            const storedUser = localStorage.getItem('auth_user');
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                // Schema migration: If user has no ID (legacy session), force logout
                if (!parsed.id) {
                    localStorage.removeItem('auth_user');
                    setUser(null);
                } else {
                    setUser(parsed);
                }
            }
        } catch (e) {
            console.error("Failed to parse user from local storage", e);
            localStorage.removeItem('auth_user');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loginWithKakao = async () => {
        return new Promise<void>((resolve, reject) => {
            if (!window.Kakao) {
                alert('Kakao SDK not loaded.');
                reject(new Error('Kakao SDK not loaded'));
                return;
            }

            if (!window.Kakao.isInitialized()) {
                window.Kakao.init('6765e9a37efb36080650271390fc85f0');
            }

            try {
                window.Kakao.Auth.login({
                    scope: 'profile_nickname, profile_image',
                    success: function (authObj: any) {
                        console.log('Kakao login success', authObj);
                        window.Kakao.API.request({
                            url: '/v2/user/me',
                            success: function (res: any) {
                                console.log('Kakao user info', res);
                                // alert('Debug User Info: ' + JSON.stringify(res)); // Removed debug alert
                                const kakaoAccount = res.kakao_account;
                                const profile = kakaoAccount?.profile || {};
                                const properties = res.properties || {};

                                const nickname = properties.nickname || profile.nickname || 'Kakao User';
                                const profileImage = properties.profile_image || profile.thumbnail_image_url || 'https://placehold.co/100x100/FEE500/000000?text=K';

                                const newUser: User = {
                                    id: res.id.toString(),
                                    nickname: nickname,
                                    profileImage: profileImage,
                                    isKakao: true
                                };
                                setUser(newUser);
                                localStorage.setItem('auth_user', JSON.stringify(newUser));
                                resolve();
                            },
                            fail: function (error: any) {
                                console.error('API request failed', error);
                                alert('Failed to get user info: ' + JSON.stringify(error));
                                reject(error);
                            },
                        });
                    },
                    fail: function (err: any) {
                        console.error('Login failed', err);
                        alert('Login failed. Check popup blocker or domain settings. Error: ' + JSON.stringify(err));
                        reject(err);
                    },
                });
            } catch (err: any) {
                alert('CRITICAL ERROR: window.Kakao.Auth.login threw an error: ' + (err.message || err));
                reject(err);
            }
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
