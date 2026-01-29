import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import styles from './Layout.module.css';

export default function Layout() {
    const { user } = useAuth();
    const { t } = useTranslation();

    return (
        <>
            <header className={styles.headerWrapper}>
                <nav className={styles.navbar}>
                    <Link to="/" className={styles.logo}>
                        <div className={styles.logoMark}>PD</div>
                        PoseDirector
                    </Link>

                    <div className={styles.navRight}>
                        <Link to="/blog" style={{ textDecoration: 'none', color: 'var(--color-text-muted)', fontWeight: 500, marginRight: '10px' }}>{t('nav.guide')}</Link>

                        {user ? (
                            <div className={styles.profile}>
                                <Link to="/me" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <img src={user.profileImage} alt={user.nickname} className={styles.avatar} />
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
            <footer style={{
                textAlign: 'center',
                padding: '20px',
                borderTop: '1px solid #eee',
                marginTop: '40px',
                fontSize: '0.8rem',
                color: '#888'
            }}>
                <p>&copy; {new Date().getFullYear()} PoseDirector. All rights reserved.</p>
                <div style={{ marginTop: '10px' }}>
                    <Link to="/privacy" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</Link>
                </div>
            </footer>
        </>
    );
}
