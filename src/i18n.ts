import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "nav": {
                "explore": "Explore Poses",
                "director": "Get AI Director"
            },
            "home": {
                "title_line1": "Confidence",
                "title_line2": "Engineered.",
                "subtitle": "Don't just take a photo. Design your presence.\nExpert pose guidance for every moment."
            },
            "poses": {
                "title": "Pose Library",
                "subtitle": "Curated angles for every moment.",
                "filter": {
                    "All": "All",
                    "Casual": "Casual",
                    "Professional": "Professional",
                    "Travel": "Travel",
                    "Event": "Event",
                    "Creative": "Creative"
                },
                "back": "← Back to Library",
                "guide_view": "Guide View",
                "practice": "Practice This Pose",
                "director_notes": "Director's Notes"
            },
            "consult": {
                "title": "AI Director",
                "subtitle": "Tell me about your situation. I'll find the perfect angle.",
                "input_placeholder": "e.g., I'm at a beach sunset with my boyfriend, we want something romantic but not cheesy.",
                "upload_text": "📷 Upload current location (optional)",
                "analyze_btn": "Get Recommendations",
                "analyzing": "Analyzing Scene...",
                "thinking": "Thinking...",
                "results_title": "Recommended for You"
            }
        }
    },
    ko: {
        translation: {
            "nav": {
                "explore": "포즈 탐색",
                "director": "AI 디렉터"
            },
            "home": {
                "title_line1": "자신감의",
                "title_line2": "기술.",
                "subtitle": "찍히는 사진에서, 만드는 사진으로.\n모든 순간을 위한 전문가의 포즈 가이드."
            },
            "poses": {
                "title": "포즈 라이브러리",
                "subtitle": "모두를 위한 완벽한 앵글.",
                "filter": {
                    "All": "전체",
                    "Casual": "캐주얼",
                    "Professional": "비즈니스",
                    "Travel": "여행",
                    "Event": "이벤트",
                    "Creative": "예술"
                },
                "back": "← 목록으로",
                "guide_view": "가이드 뷰",
                "practice": "이 포즈 연습하기",
                "director_notes": "디렉터스 노트"
            },
            "consult": {
                "title": "AI 디렉터",
                "subtitle": "어떤 상황인지 알려주세요. 딱 맞는 앵글을 찾아드립니다.",
                "input_placeholder": "예: 남자친구랑 바다 노을을 배경으로 찍을 건데, 너무 오글거리지 않으면서 분위기 있게 찍고 싶어요.",
                "upload_text": "📷 현재 장소 사진 업로드 (선택)",
                "analyze_btn": "포즈 추천 받기",
                "analyzing": "분석 중...",
                "thinking": "생각 중...",
                "results_title": "추천 포즈"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
