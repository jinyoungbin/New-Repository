import { useTranslation } from 'react-i18next';
import styles from './PrivacyPolicy.module.css';

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <h1>{t('privacy.title', 'Privacy Policy')}</h1>
                <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to PoseDirector ("we," "our," or "us"). We match users with AI-powered photo analysis and pose guidance.
                        We respect your privacy and are committed to protecting your personal data.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <p>
                        We collect minimal information required to provide our services:
                    </p>
                    <ul>
                        <li><strong>Uploaded Images:</strong> Photos you upload for analysis are processed temporarily by our AI (Gemini API) and are NOT permanently stored on our servers unless you explicitly save them to your profile.</li>
                        <li><strong>Authentication Data:</strong> If you log in via Kakao, we receive your basic profile information (nickname, profile image) to create your account.</li>
                        <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to improve our app performance.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <ul>
                        <li>To provide photo analysis and scoring results.</li>
                        <li>To maintain your "My Page" history and saved poses.</li>
                        <li>To improve user experience and fix bugs.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Advertising (AdSense)</h2>
                    <p>
                        We use Google AdSense to serve ads. Google may use cookies to serve ads based on your prior visits to our website or other websites.
                        Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
                        Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Ads Settings</a>.
                    </p>
                </section>

                <section>
                    <h2>5. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at: support@posedirector.com
                    </p>
                </section>
            </div>
        </main>
    );
}
