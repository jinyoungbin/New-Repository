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
