import styles from './KakaoLoginBtn.module.css';

interface KakaoLoginBtnProps {
    onClick: () => void;
    isLoading?: boolean;
}

export default function KakaoLoginBtn({ onClick, isLoading }: KakaoLoginBtnProps) {
    return (
        <button
            className={styles.kakaoBtn}
            onClick={onClick}
            disabled={isLoading}
        >
            {/* Simple SVG Icon for Kakao Symbol */}
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.58 3 4 5.79 4 9.24C4 11.23 5.23 13 7.11 14.15L6.16 17.65C6.12 17.81 6.27 17.95 6.42 17.85L10.73 15.06C11.14 15.11 11.56 15.14 12 15.14C16.42 15.14 20 12.35 20 8.9C20 5.45 16.42 3 12 3Z" />
            </svg>
            <span className={styles.label}>
                {isLoading ? '연결 중...' : '카카오 로그인'}
            </span>
        </button>
    );
}
