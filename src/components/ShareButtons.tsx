import { shareKakao, uploadKakaoImage } from '@/lib/kakao';
import { useState } from 'react';

interface ShareButtonsProps {
    title: string;
    description: string;
    url?: string;
    imageUrl?: string;
    imageFile?: File | null; // Optional file to upload
    buttonTitle?: string; // Optional custom button text
}

export default function ShareButtons({ title, description, url = window.location.href, imageUrl, imageFile, buttonTitle }: ShareButtonsProps) {
    const [isSharing, setIsSharing] = useState(false);

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

    const handleKakao = async () => {
        if (isSharing) return;
        setIsSharing(true);

        let finalImageUrl = imageUrl;

        // If a file is provided, try uploading it to Kakao first
        if (imageFile) {
            const uploadedUrl = await uploadKakaoImage(imageFile);
            if (uploadedUrl) {
                finalImageUrl = uploadedUrl;
            }
        }

        shareKakao(title, description, finalImageUrl, url, buttonTitle);
        setIsSharing(false);
    };

    return (
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
            {/* Kakao Button */}
            <button
                onClick={handleKakao}
                disabled={isSharing}
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: isSharing ? '#e0e0e0' : '#FEE500', // Dim if sharing
                    color: '#000',
                    fontSize: '24px',
                    cursor: isSharing ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'background-color 0.2s'
                }}
                title="Share to KakaoTalk"
            >
                {isSharing ? '⏳' : '💬'}
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
