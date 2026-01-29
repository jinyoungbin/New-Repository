import { LocalizedText } from '@/lib/photoAnalysis';

export interface Article {
    id: string;
    title: LocalizedText;
    excerpt: LocalizedText;
    date: string;
    content: LocalizedText; // Markdown-like or HTML string
    thumbnail: string;
    category: LocalizedText;
}

export const ARTICLES: Article[] = [
    {
        id: 'golden-hour-guide',
        title: {
            en: 'Golden Hour Photography: The Secret to Perfect Lighting',
            ko: '골든 아워: 인생샷을 만드는 마법의 시간'
        },
        excerpt: {
            en: 'Learn why the hour after sunrise and before sunset creates the most flattering photos, and how to use it for your portraits.',
            ko: '일출 직후와 일몰 직전, 사진이 가장 예쁘게 나오는 시간대인 골든 아워 활용법을 알아보세요.'
        },
        date: '2025-05-15',
        category: {
            en: 'Photography Tips',
            ko: '사진 촬영 팁'
        },
        thumbnail: 'https://placehold.co/600x400/orange/white?text=Golden+Hour',
        content: {
            en: `
            <h2>What is the Golden Hour?</h2>
            <p>In photography, the golden hour is the period of daytime shortly after sunrise or before sunset, during which daylight is redder and softer than when the Sun is higher in the sky. This light is universally flattering for portraits because it diffuses shadows and adds a warm glow to the skin.</p>
            
            <h3>Why is it better?</h3>
            <ul>
                <li><strong>Soft Shadows:</strong> The low angle of the sun creates long, soft shadows rather than harsh, dark ones found at noon.</li>
                <li><strong>Warm Tones:</strong> The light travels through more of the atmosphere, scattering blue light and leaving warm reds and oranges.</li>
                <li><strong>Dimensionality:</strong> Side lighting adds depth and texture to your photos.</li>
            </ul>

            <h3>How to shoot during Golden Hour</h3>
            <p>1. <strong>Plan Ahead:</strong> Use a weather app to find the exact sunset time. Arrive 30 minutes early.</p>
            <p>2. <strong>Backlighting:</strong> Place your subject between you and the sun for a beautiful "halo" effect on their hair.</p>
            <p>3. <strong>Front Lighting:</strong> Have your subject face the sun for a warm, direct glow that smooths out skin imperfections.</p>
        `,
            ko: `
            <h2>골든 아워(Golden Hour)란?</h2>
            <p>사진에서 골든 아워란 해가 뜨고 난 직후나 해가 지기 직전의 짧은 시간을 말합니다. 이때 태양광은 낮보다 훨씬 부드럽고 붉은 빛을 띠죠. 이 빛은 그림자를 부드럽게 만들고 피부에 따뜻한 느낌을 더해주어 인물 사진을 찍기에 가장 완벽한 시간입니다.</p>
            
            <h3>왜 더 좋을까요?</h3>
            <ul>
                <li><strong>부드러운 그림자:</strong> 태양의 각도가 낮아져 낮 12시의 강한 그림자가 아닌, 길고 부드러운 그림자가 생깁니다.</li>
                <li><strong>따뜻한 색감:</strong> 빛이 대기를 길게 통과하며 파란색 빛은 흩어지고, 따뜻한 붉은색과 주황색 빛만 남게 됩니다.</li>
                <li><strong>입체감:</strong> 측면에서 들어오는 빛이 사진에 깊이감과 질감을 더해줍니다.</li>
            </ul>

            <h3>골든 아워 촬영 팁</h3>
            <p>1. <strong>미리 계획하기:</strong> 날씨 앱으로 정확한 일몰 시간을 확인하고, 30분 전에 도착해서 준비하세요.</p>
            <p>2. <strong>역광 활용하기:</strong> 피사체를 태양과 카메라 사이에 두면 머리카락 끝에 아름다운 "헤일로(광배)" 효과를 만들 수 있습니다.</p>
            <p>3. <strong>순광 활용하기:</strong> 피사체가 태양을 바라보게 하면 피부 결점이 가려지고 따뜻하고 화사한 느낌을 줄 수 있습니다.</p>
        `
        }
    },
    {
        id: 'posing-basics-101',
        title: {
            en: 'Posing 101: How to Look Natural in Every Photo',
            ko: '포즈의 정석: 자연스러운 인생샷을 위한 3가지 법칙'
        },
        excerpt: {
            en: 'Stop freezing up in front of the camera. Master these three simple techniques to look relaxed and confident.',
            ko: '카메라 앞에만 서면 얼음이 되시나요? 이 3가지 기술만 알면 자연스럽고 자신감 넘치는 모습을 연출할 수 있습니다.'
        },
        date: '2025-05-20',
        category: {
            en: 'Posing Guide',
            ko: '포즈 가이드'
        },
        thumbnail: 'https://placehold.co/600x400/blue/white?text=Posing+101',
        content: {
            en: `
            <h2>The "Triangle" Rule</h2>
            <p>One of the biggest mistakes in posing is standing straight like a soldier. To look more dynamic, create triangles with your body. </p>
            <ul>
                <li>Put your hand on your hip (creates a triangle with your arm).</li>
                <li>Bend one knee slightly.</li>
                <li>Lean against a wall with one elbow.</li>
            </ul>

            <h2>What to do with your hands?</h2>
            <p>It's the most common question: "Where do I put my hands?" Here are safe bets:</p>
            <ul>
                <li><strong>The Prop:</strong> Hold a coffee cup, sunglasses, or purse. It gives your hands a purpose.</li>
                <li><strong>Light Touch:</strong> Lightly touch your hair, chin, or clothing. Don't press hard; just graze.</li>
                <li><strong>Pockets:</strong> Put thumbs in pockets (leaving fingers out) or fingers in pockets (leaving thumbs out). Never hide the whole hand.</li>
            </ul>

            <h2>Movement is Key</h2>
            <p>Static poses often look stiff. Instead of holding a breath, try moving slowly. Walk towards the camera, twirl a dress, or look away and then turn back to the lens. Continuous movement results in more candid specific shots.</p>
        `,
            ko: `
            <h2>"삼각형" 법칙</h2>
            <p>포즈의 가장 큰 적은 차려 자세로 뻣뻣하게 서 있는 것입니다. 더 역동적인 느낌을 주려면 몸으로 삼각형을 만들어보세요.</p>
            <ul>
                <li>손을 허리에 올리세요 (팔로 삼각형 만들기).</li>
                <li>한쪽 무릎을 살짝 굽히세요.</li>
                <li>한쪽 팔꿈치로 벽에 기대보세요.</li>
            </ul>

            <h2>손은 어디에 둬야 할까요?</h2>
            <p>가장 많이 하는 질문이죠. "손을 어디에 둬야 할지 모르겠어요." 여기 실패 없는 방법들이 있습니다:</p>
            <ul>
                <li><strong>소품 활용:</strong> 커피잔, 선글라스, 가방 등을 드세요. 손이 할 일을 주면 자연스러워집니다.</li>
                <li><strong>가볍게 터치:</strong> 머리카락, 턱, 옷을 가볍게 만지세요. 꾹 누르지 말고 살짝 스치듯 만져야 합니다.</li>
                <li><strong>주머니:</strong> 엄지만 넣고 나머지 손가락은 밖으로 빼거나, 반대로 하세요. 손 전체를 숨기지는 마세요.</li>
            </ul>

            <h2>움직임이 핵심입니다</h2>
            <p>멈춰 있는 자세는 뻣뻣해 보이기 쉽습니다. 숨을 참지 말고 천천히 움직여보세요. 카메라를 향해 걸어오거나, 치마를 살짝 흔들거나, 먼 곳을 보다가 카메라를 쳐다보세요. 계속 움직이면 훨씬 자연스러운 컷을 건질 수 있습니다.</p>
        `
        }
    },
    {
        id: 'camera-angles-explained',
        title: {
            en: 'Low vs. High Angles: How Perspective Changes Meaning',
            ko: '각도의 중요성: 로우 앵글 vs 하이 앵글 완전 정복'
        },
        excerpt: {
            en: 'The angle of your camera tells a story. Learn when to shoot from below and when to shoot from above.',
            ko: '카메라 각도에 따라 사진의 분위기가 완전히 달라집니다. 언제 아래에서 찍고, 언제 위에서 찍어야 할까요?'
        },
        date: '2025-05-25',
        category: {
            en: 'Photography Tips',
            ko: '사진 촬영 팁'
        },
        thumbnail: 'https://placehold.co/600x400/green/white?text=Angles',
        content: {
            en: `
            <h2>The Low Angle (The Hero Shot)</h2>
            <p>Shooting from a low angle (looking up at the subject) makes them look powerful, taller, and more dominant. This is great for fashion (elongates legs) or "boss" vibes.</p>
            <p><strong>Tip:</strong> Be careful with double chins. Ask the subject to push their chin forward slightly.</p>

            <h2>The High Angle</h2>
            <p>Shooting from above (looking down) is generally flattering for the face as it emphasizes eyes and jawline while minimizing the body. It creates a cuter, more approachable look.</p>
            <p><strong>Tip:</strong> Don't go too high, or you'll distort the proportions (big head, tiny body).</p>

            <h2>Eye Level</h2>
            <p>The most neutral and honest perspective. It connects the viewer directly with the subject. Use this for professional headshots or intimate portraits.</p>
        `,
            ko: `
            <h2>로우 앵글 (The Hero Shot)</h2>
            <p>아래에서 위로 찍는 로우 앵글은 피사체를 더 크고, 힘차고, 압도적으로 보이게 만듭니다. 다리를 길어 보이게 하는 패션 사진이나 "보스" 같은 분위기를 낼 때 좋습니다.</p>
            <p><strong>팁:</strong> 턱살이 접히지 않도록 주의하세요. 피사체에게 턱을 살짝 앞으로 내밀라고 요청하세요.</p>

            <h2>하이 앵글 (얼짱 각도)</h2>
            <p>위에서 아래로 찍는 하이 앵글은 얼굴선과 눈을 강조하고 몸은 작아 보이게 하여, 일반적으로 얼굴이 가장 예쁘게 나옵니다. 귀엽고 친근한 느낌을 줍니다.</p>
            <p><strong>팁:</strong> 너무 높이 찍으면 머리는 크고 몸은 작은 "대두" 사진이 될 수 있으니 주의하세요.</p>

            <h2>아이 레벨 (눈높이)</h2>
            <p>가장 중립적이고 솔직한 시선입니다. 보는 사람과 피사체가 눈을 맞추는 듯한 친밀감을 줍니다. 증명사진이나 진솔한 인물 사진에 적합합니다.</p>
        `
        }
    }
];
