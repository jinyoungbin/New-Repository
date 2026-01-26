import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LanguageSelector from './LanguageSelector';
import styles from './Layout.module.css';

export default function Layout() {
    const { user } = useAuth();

    return (
        <>
            <header className={styles.headerWrapper}>
                <nav className={styles.navbar}>
                    <Link to="/" className={styles.logo}>
                        <div className={styles.logoMark}>PD</div>
                        PoseDirector
                    </Link>
                    <div className={styles.navRight}>
                        {user ? (
                            <div className={styles.profile}>
                                <Link to="/me" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <img src={user.profileImage} alt={user.nickname} className={styles.avatar} />
                                    {/* Optional: Show name on desktop */}
                                    {/* <span style={{fontWeight: 500}}>{user.nickname}</span> */}
                                </Link>
                            </div>
                        ) : (
                            <Link to="/login" className={styles.loginBtn}>Login</Link>
                        )}
                        <LanguageSelector />
                    </div>
                </nav>
            </header>
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </>
    );
}
