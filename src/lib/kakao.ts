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

export function shareKakao(title: string, description: string, imageUrl?: string, linkUrl?: string) {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
        console.warn('Kakao SDK not initialized');
        return;
    }

    const targetUrl = linkUrl || window.location.href; // Use specific URL or current page
    // alert(`Debug: Checking Link URL\n${targetUrl}`); // Debugging line


    try {
        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: description,
                imageUrl: imageUrl || 'https://via.placeholder.com/600x400?text=PoseDirector',
                link: {
                    mobileWebUrl: targetUrl,
                    webUrl: targetUrl,
                },
                imageWidth: 600,
                imageHeight: 600,
            },
            buttons: [
                {
                    title: '이 점수 이겨보기 👊',
                    link: {
                        mobileWebUrl: targetUrl,
                        webUrl: targetUrl,
                    },
                },
                {
                    title: '앱 구경하기 👀',
                    link: {
                        mobileWebUrl: window.location.origin,
                        webUrl: window.location.origin,
                    },
                }
            ],
        });
    } catch (e) {
        console.error('Kakao Share Failed', e);
    }
}
