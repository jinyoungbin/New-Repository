import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LanguageSelector from './LanguageSelector';
import styles from './Layout.module.css';

export default function Layout() {
    const { user, logout } = useAuth();

    return (
        <>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.logo}>
                    PoseDirector
                </Link>
                <div className={styles.navRight}>
                    {user ? (
                        <div className={styles.profile}>
                            <img src={user.profileImage} alt={user.nickname} className={styles.avatar} />
                            <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className={styles.loginBtn}>Login</Link>
                    )}
                    <LanguageSelector />
                </div>
            </nav>
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </>
    );
}
