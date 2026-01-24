export interface Pose {
    id: string;
    title: string;
    description: string;
    category: '캐주얼' | '비즈니스' | '여행' | '커플/이벤트' | '크리에이티브';
    tags: string[];
    imageUrl: string;
    difficulty: '초급' | '중급' | '고급';
    tips: string[];
}

export const POSES: Pose[] = [
    {
        id: 'casual-coffee',
        title: '카페에서의 여유',
        description: '카페에서 자연스럽고 분위기 있는 샷. 카메라를 의식하지 않고 주변 분위기에 녹아드는 것이 포인트입니다.',
        category: '캐주얼',
        tags: ['자연스러운', '감성', '앉은자세'],
        imageUrl: '/images/pose-casual.png',
        difficulty: '초급',
        tips: [
            '양손으로 컵을 감싸 쥐어 손의 어색함을 없애세요.',
            '렌즈 대신 창밖이나 커피를 응시하세요.',
            '어깨 힘을 빼고 자연스럽게 툭 떨어트리세요 (1cm만 내려보세요).',
            '살짝 앞으로 기울여 대화에 집중하는 듯한 느낌을 줍니다.'
        ]
    },
    {
        id: 'casual-street',
        title: '스트릿 무드 (벽 기대기)',
        description: '지나가다 만난 예쁜 벽에서. 무심한 듯 시크한 스트릿 감성을 연출하세요.',
        category: '캐주얼',
        tags: ['전신', '힙한', '데일리룩'],
        imageUrl: 'https://placehold.co/600x800/png?text=Street+Vibe',
        difficulty: '초급',
        tips: [
            '한쪽 다리를 벽에 살짝 올리거나 꼬아서 입체감을 주세요.',
            '주머니에 손을 넣거나 가방 끈을 잡아 자연스럽게.',
            '카메라는 배꼽 높이에서 살짝 올려다보게 찍으면 비율이 좋아보입니다.',
            '시선은 카메라 정면보다는 살짝 아래나 먼 곳을 보세요.'
        ]
    },
    {
        id: 'pro-headshot',
        title: '자신감 있는 프로필',
        description: '링크드인이나 회사 프로필에 적합합니다. 신뢰감 있고 당당한 이미지를 연출합니다.',
        category: '비즈니스',
        tags: ['자신감', '스튜디오', '서서찍기'],
        imageUrl: '/images/pose-professional.png',
        difficulty: '중급',
        tips: [
            '몸을 카메라에서 45도 정도 살짝 틀어주세요.',
            '얼굴은 정면 렌즈를 향해 돌려주세요.',
            '눈을 살짝 찌푸려(Squinch) 집중력 있는 눈빛을 만드세요.',
            '턱을 살짝 당기고 목을 길게 빼세요 (거북목 교정 느낌).'
        ]
    },
    {
        id: 'business-power',
        title: '파워 포즈',
        description: '승리, 자신감, 리더십을 표현하고 싶을 때. 발표 전이나 중요한 미팅 전에 찍어보세요.',
        category: '비즈니스',
        tags: ['리더십', '전신', '당당함'],
        imageUrl: '/images/pose-confidence.png',
        difficulty: '초급',
        tips: [
            '다리를 어깨 너비보다 넓게 벌리고 서세요.',
            '손을 허리에 얹어 공간을 넓게 차지하세요.',
            '가슴을 펴고 턱을 들어 올리세요.',
            '내가 이 공간의 주인이라는 생각을 가지세요.'
        ]
    },
    {
        id: 'pro-desk',
        title: '몰입하는 전문가',
        description: '일하는 모습이 가장 멋있을 때. 데스크에서 업무에 집중하는 자연스러운 컷.',
        category: '비즈니스',
        tags: ['업무중', '자연스러운', '스마트한'],
        imageUrl: 'https://placehold.co/800x600/png?text=Work+Focus',
        difficulty: '중급',
        tips: [
            '노트북 화면이나 서류를 응시하세요 (카메라 무시).',
            '한 손으로 턱을 괴거나 마우스를 잡는 등 실제 행동을 하세요.',
            '주변 지저분한 선들은 치우고 심플한 배경을 만드세요.',
            '안경이나 펜 같은 소품을 활용하면 지적인 느낌이 배가됩니다.'
        ]
    },
    {
        id: 'travel-landmark',
        title: '여행지 인생 뒷모습',
        description: '배경이 다하는 사진. 표정 관리가 필요 없어 누구나 인생샷 건지기 쉬운 포즈.',
        category: '여행',
        tags: ['전신', '뒷모습', '풍경위주'],
        imageUrl: 'https://placehold.co/800x600/png?text=Travel+Backview',
        difficulty: '초급',
        tips: [
            '카메라를 정면으로 보지 말고 완전히 뒤로 돌아주세요.',
            '양팔을 넓게 벌려 풍경을 안는 듯한 느낌을 주세요.',
            '한쪽 다리를 살짝 들어 역동적인 느낌을 더해보세요.',
            '광각 렌즈를 사용하면 다리가 더 길어 보이고 풍경도 많이 담깁니다.'
        ]
    },
    {
        id: 'couple-walk',
        title: '함께 걷는 순간',
        description: '포즈를 취하기보다 서로의 교감에 집중하는 커플 샷입니다.',
        category: '커플/이벤트',
        tags: ['커플', '로맨틱', '걷기'],
        imageUrl: 'https://placehold.co/800x600/png?text=Couple+Walk',
        difficulty: '초급',
        tips: [
            '손을 가볍게 잡고 걷습니다.',
            '서로 마주보며 대화하거나 웃으세요 (가짜 웃음도 사진엔 예쁘게 나옵니다!).',
            '천천히 카메라 쪽으로 걸어오세요.',
            '어깨나 힙이 살짝 닿을 듯 말 듯 가깝게 유지하세요.'
        ]
    },
    {
        id: 'life-4-cuts-fun',
        title: '인생네컷: 엽기 발랄',
        description: '친구와 함께하는 4컷 사진 포즈 가이드. 진지함은 버리고 장난기 가득하게!',
        category: '커플/이벤트',
        tags: ['우정샷', '발랄한', '4컷사진'],
        imageUrl: '/images/pose-life4cuts.png',
        difficulty: '초급',
        tips: [
            'Tip 1: 귀엽게 브이✌️ (얼굴 가까이 대보세요)',
            'Tip 2: 서로 볼 찌르기👉👈 (장난스럽게!)',
            'Tip 3: 엽기 표정 몰아주기 또는 선글라스 착용😎',
            'Tip 4: 머리 위로 큰 하트 만들기🫶'
        ]
    },
    {
        id: 'creative-shadow',
        title: '빛과 그림자',
        description: '강렬한 빛을 활용한 예술적인 무드 샷.',
        category: '크리에이티브',
        tags: ['무드있는', '예술적', '그림자'],
        imageUrl: '/images/pose-artistic.png',
        difficulty: '고급',
        tips: [
            '창가나 강한 조명 옆을 찾으세요.',
            '손을 이용해 얼굴에 부분적으로 그림자를 만드세요.',
            '눈을 감고 고개를 살짝 들어 빛을 느끼는 표정을 지어보세요.',
            '표정보다는 빛이 얼굴에 닿는 모양에 집중하세요.'
        ]
    }
];
