import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import KakaoLoginBtn from '@/components/KakaoLoginBtn';
import styles from './Login.module.css';

export default function LoginPage() {
    const { loginWithKakao, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleKakaoLogin = async () => {
        await loginWithKakao();
        navigate('/'); // Redirect to home after login
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Log in to save your favorite poses.</p>

            <KakaoLoginBtn onClick={handleKakaoLogin} isLoading={isLoading} />

            <button className={styles.guestBtn} onClick={() => navigate('/')}>
                Continue as Guest
            </button>
        </main>
    );
}
