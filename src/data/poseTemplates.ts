export interface PoseTemplate {
    id: string;
    category: string;
    title: string;
    description: string;
    svgPath: string; // viewBox="0 0 100 200" for a vertical portrait aspect ratio
}

export const POSE_TEMPLATES: PoseTemplate[] = [
    {
        id: 'casual_standing_1',
        category: 'Casual',
        title: 'Casual Lean',
        description: 'Lean against a wall or imaginary surface for a relaxed look.',
        // Simple stick-figure-ish path for a standing lean
        svgPath: 'M50,20 C60,20 60,30 50,30 C40,30 40,20 50,20 M50,30 L50,80 M30,40 L50,50 L70,40 M40,80 L40,150 M60,80 L60,150'
    },
    {
        id: 'travel_point',
        category: 'Travel',
        title: 'The Pointer',
        description: 'Point at the landmark behind you!',
        svgPath: 'M50,20 C60,20 60,30 50,30 C40,30 40,20 50,20 M50,30 L50,80 M20,50 L50,40 L80,30 M40,80 L35,150 M60,80 L65,150'
    },
    {
        id: 'professional_crossed',
        category: 'Professional',
        title: 'Confident Arms',
        description: 'Arms crossed, standing straight. Good for profiles.',
        svgPath: 'M50,20 C60,20 60,30 50,30 C40,30 40,20 50,20 M50,30 L50,80 M30,50 L50,60 L70,50 M30,50 L40,60 M70,50 L60,60 M45,80 L45,150 M55,80 L55,150'
    },
    {
        id: 'creative_framing',
        category: 'Creative',
        title: 'Frame the Shot',
        description: 'Use your hands to frame your face or the scene.',
        svgPath: 'M50,25 C58,25 58,35 50,35 C42,35 42,25 50,25 M50,35 L50,90 M25,40 L35,30 M75,40 L65,30 M25,40 L50,55 L75,40 M45,90 L40,160 M55,90 L60,160'
    }
];

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
    'Casual': ['casual', 'relaxed', 'chill', 'daily'],
    'Professional': ['business', 'work', 'profile', 'linkedin'],
    'Travel': ['travel', 'trip', 'landmark', 'vacation'],
    'Creative': ['art', 'fun', 'unique', 'weird']
};
