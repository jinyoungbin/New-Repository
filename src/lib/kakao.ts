declare global {
    interface Window {
        Kakao: any;
    }
}

const KAKAO_KEY = '6765e9a37efb36080650271390fc85f0'; // User provided key

export function initKakao() {
    if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_KEY);
        console.log('Kakao SDK Initialized');
    }
}

export async function uploadKakaoImage(file: File): Promise<string> {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
        console.warn('Kakao SDK not initialized');
        return '';
    }

    try {
        const response = await window.Kakao.Share.uploadImage({
            file: [file]
        });
        return response.infos.original.url;
    } catch (e) {
        console.error('Kakao Image Upload Failed', e);
        return '';
    }
}

export function shareKakao(title: string, description: string, imageUrl?: string, linkUrl?: string, buttonTitle: string = '자세히 보기') {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
        console.warn('Kakao SDK not initialized');
        return;
    }

    const PRODUCTION_DOMAIN = 'https://new-repository-011.pages.dev';

    // Logic to enforce production URL specifically for shared links
    let finalTargetUrl = PRODUCTION_DOMAIN;

    if (linkUrl) {
        if (linkUrl.startsWith('http')) {
            // If it's already a full URL, check if it's localhost and replace it
            if (linkUrl.includes('localhost') || linkUrl.includes('127.0.0.1')) {
                try {
                    const urlObj = new URL(linkUrl);
                    finalTargetUrl = `${PRODUCTION_DOMAIN}${urlObj.pathname}`;
                } catch {
                    finalTargetUrl = `${PRODUCTION_DOMAIN}/scoring`;
                }
            } else {
                finalTargetUrl = linkUrl;
            }
        } else {
            // It's a relative path, append to production domain
            finalTargetUrl = `${PRODUCTION_DOMAIN}${linkUrl.startsWith('/') ? '' : '/'}${linkUrl}`;
        }
    } else {
        // Fallback to home or specific logic
        finalTargetUrl = PRODUCTION_DOMAIN;
    }

    try {
        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: description,
                imageUrl: imageUrl || 'https://via.placeholder.com/600x400?text=PoseDirector',
                link: {
                    mobileWebUrl: finalTargetUrl,
                    webUrl: finalTargetUrl,
                },
                imageWidth: 600,
                imageHeight: 600,
            },
            buttons: [
                {
                    title: buttonTitle,
                    link: {
                        mobileWebUrl: finalTargetUrl,
                        webUrl: finalTargetUrl,
                    },
                },
                {
                    title: '앱 구경하기 👀',
                    link: {
                        mobileWebUrl: PRODUCTION_DOMAIN,
                        webUrl: PRODUCTION_DOMAIN,
                    },
                }
            ],
        });
    } catch (e) {
        console.error('Kakao Share Failed', e);
    }
}
