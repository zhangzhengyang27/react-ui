import { useRef, useState } from 'react';

const FALLBACK_THEMES = {
  cn: [
    '温暖阳光的橙色调，营造活力积极的氛围',
    '专业稳重的深海蓝商务风格',
    '清新自然的森林绿环保主题',
    '极客紫霓虹感的科技前沿风格',
    '柔和粉紫的樱花春日浪漫主题',
    '高对比度的赛博朋克深色科技风',
    '莫兰迪灰色调，简约优雅的现代感',
    '青花瓷蓝白配色，东方雅韵',
    '马卡龙多彩配色，活泼童趣',
    '水墨黑白灰，传统韵味',
  ],
  en: [
    'Warm sunny orange tones for energetic positive vibes',
    'Professional deep ocean blue business style',
    'Fresh natural forest green eco-friendly theme',
    'Geek purple neon tech cutting-edge style',
    'Soft pink-purple cherry blossom spring romantic theme',
    'High contrast cyberpunk dark tech style',
    'Morandi gray tones, minimalist elegant modern feel',
    'Blue and white porcelain colors, Eastern elegance',
    'Colorful macaron, lively and playful',
    'Ink black white gray, traditional charm',
  ],
};

/** 从内置风格池随机抽取推荐词，无外部服务依赖（与本地主题生成器一致） */
const pickRecommendations = (localeKey: keyof typeof FALLBACK_THEMES, count = 4): string[] => {
  const pool = [...FALLBACK_THEMES[localeKey]];
  const picked: string[] = [];
  while (pool.length > 0 && picked.length < count) {
    picked.push(...pool.splice(Math.floor(Math.random() * pool.length), 1));
  }
  return picked;
};

export default function usePromptRecommend(localeKey: keyof typeof FALLBACK_THEMES = 'cn') {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchedKeyRef = useRef<string>('');

  const fetch = async (key: string) => {
    if (fetchedKeyRef.current === key) {
      return;
    }
    fetchedKeyRef.current = key;
    setLoading(true);
    setRecommendations(pickRecommendations(localeKey));
    setLoading(false);
  };

  return { recommendations, loading, fetch };
}
