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
                "title_part1": "Don't just admire.",
                "title_part2": "Replicate.",
                "subtitle_line1": "Upload any photo you love.",
                "subtitle_line2": "We'll break down the <1>Lighting</1>, <2>Angle</2>, and <3>Pose</3> instantly.",
                "cta_analyze": "Analyze Photo",
                "cta_practice": "Practice Mode"
            },
            "home_scoring": {
                "title": "AI Photo Scorer",
                "subtitle": "Unsure about your shot? Get an instant AI quality score.",
                "feature1": "Composition Check",
                "feature2": "Lighting Quality",
                "cta": "Check My Score"
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
            },
            "categories": {
                "Casual": "Casual",
                "Professional": "Professional",
                "Travel": "Travel",
                "Creative": "Creative"
            },
            "analysis": {
                "title": "Photo Reverse Engineering",
                "subtitle": "Upload a photo. Steal the technique.",
                "click_drag": "Click or Drag Photo Here",
                "upload_desc": "Analyze lighting, angle, and pose",
                "analyze_btn": "⚡ Analyze Recipe",
                "analyzing": "Deconstructing Image...",
                "recipe_title": "📸 The Recipe",
                "lighting": "Lighting",
                "tip": "DIRECTOR'S TIP",
                "new_photo": "Analyze New Photo",
                "save_recipe": "Save Recipe",
                "saved_as_pose": "Saved to your Poses!"
            },
            "mypage": {
                "analyzed_count": "Analyzed Photos",
                "saved_count": "Saved Poses",
                "recent_activity": "Recent Activity",
                "empty_activity": "No recent activity yet. Try analyzing a photo!",
                "logout": "Logout"
            },
            "scoring": {
                "title": "AI Photo Score",
                "subtitle": "Get a professional critique in seconds.",
                "upload_cta": "Upload your best shot",
                "upload_sub": "Click to browse",
                "analyzing": "Judging your masterpiece...",
                "good_point": "What worked",
                "improve_point": "How to improve",
                "btn_evaluate": "Get Score",
                "btn_retry": "Evaluate Another Photo"
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
                "title_part1": "보기만 했던 인생샷,",
                "title_part2": "이제 직접 찍어보세요.",
                "subtitle": "전문가처럼 찍고 싶으신가요? AI가 사진의 비밀을 분석해드립니다.",
                "feature1": "전문 조명 분석",
                "feature2": "최적 포즈 추천",
                "cta_analyze": "분석 시작하기",
                "cta_practice": "연습 모드"
            },
            "home_scoring": {
                "title_part1": "궁금했던 내 사진 점수,",
                "title_part2": "지금 바로 확인해보세요.",
                "subtitle": "잘 찍은 사진인지 궁금하다면? AI가 즉시 채점해드립니다.",
                "feature1": "구도 적합성",
                "feature2": "조명 퀄리티",
                "cta": "내 점수 확인하기"
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
            },
            "categories": {
                "Casual": "캐주얼",
                "Professional": "비즈니스",
                "Travel": "여행",
                "Creative": "크리에이티브"
            },
            "analysis": {
                "title": "사진 역설계 (Reverse Engineering)",
                "subtitle": "워너비 사진을 올리세요. 촬영 비법을 훔쳐드립니다.",
                "click_drag": "사진을 클릭하거나 드래그하세요",
                "upload_desc": "조명, 각도, 포즈를 분석합니다",
                "analyze_btn": "⚡ 촬영 레시피 분석",
                "analyzing": "이미지 해부 중...",
                "recipe_title": "📸 촬영 레시피",
                "lighting": "조명 (Lighting)",
                "angle": "각도 (Angle)",
                "pose": "포즈 (Pose)",
                "tip": "디렉터의 꿀팁",
                "new_photo": "새로운 사진 분석",
                "save_recipe": "레시피 저장",
                "saved_as_pose": "나만의 포즈로 저장되었습니다!"
            },
            "mypage": {
                "analyzed_count": "분석한 사진",
                "saved_count": "저장된 포즈",
                "recent_activity": "최근 활동",
                "empty_activity": "아직 활동 내역이 없습니다. 사진을 분석해보세요!",
                "logout": "로그아웃"
            },
            "scoring": {
                "title": "AI Photo Score",
                "subtitle": "전문가의 평가를 몇 초 만에 받아보세요.",
                "upload_cta": "인생샷 업로드",
                "upload_sub": "클릭하여 찾아보기",
                "analyzing": "걸작을 심사하는 중...",
                "good_point": "좋은 점",
                "improve_point": "아쉬운 점",
                "btn_evaluate": "점수 확인하기",
                "btn_retry": "다른 사진 평가하기"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ko', // Force default to Korean
        fallbackLng: 'ko',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
