import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.css';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' },
    // { code: 'ja', label: '日本語' },
];

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button className={styles.button} onClick={toggleDropdown}>
                🌐 {currentLang.label}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.sectionTitle}>Select Language</div>
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            className={`${styles.option} ${i18n.language === lang.code ? styles.active : ''}`}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
