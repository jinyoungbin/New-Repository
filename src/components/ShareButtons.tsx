import { shareKakao } from '@/lib/kakao';

interface ShareButtonsProps {
    title: string;
    description: string;
    url?: string;
    imageUrl?: string;
}

export default function ShareButtons({ title, description, url = window.location.href, imageUrl }: ShareButtonsProps) {

    const handleTwitter = () => {
        const text = `${title}\n${description}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=PoseDirector,AIPhoto`;
        window.open(twitterUrl, '_blank');
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard! 📋');
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleKakao = () => {
        shareKakao(title, description, imageUrl, url);
    };

    return (
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
            {/* Kakao Button */}
            <button
                onClick={handleKakao}
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#FEE500', // Kakao Yellow
                    color: '#000',
                    fontSize: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                title="Share to KakaoTalk"
            >
                💬
            </button>

            {/* Twitter/X Button */}
            <button
                onClick={handleTwitter}
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#000', // X Black
                    color: '#fff',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                title="Share to X (Twitter)"
            >
                𝕏
            </button>

            {/* Copy Link Button */}
            <button
                onClick={handleCopyLink}
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    color: '#666',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
                title="Copy Link"
            >
                🔗
            </button>
        </div>
    );
}
