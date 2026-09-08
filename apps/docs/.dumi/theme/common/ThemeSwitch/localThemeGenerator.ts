/**
 * 本地主题生成器：根据提示词推导配色并生成主题覆盖 JSON。
 * 纯前端实现（关键词映射 + 提示词哈希），无需任何外部服务。
 * 输出与 usePromptTheme 期望的「AI 返回 JSON」结构一致：
 * { primaryColor, colors: { brand: [10 个色阶] } }
 */

interface PaletteKeywords {
  [keyword: string]: number; // 色相（0-360）
}

const KEYWORD_HUES: PaletteKeywords = {
  海: 210, 海洋: 210, ocean: 210, sea: 210, 蓝: 210, blue: 210, 天空: 205, sky: 205,
  森林: 150, 森: 150, 绿: 150, green: 150, forest: 150, 薄荷: 165, mint: 165,
  火: 8, 红: 8, red: 8, fire: 15, 玫瑰: 350, rose: 350, 珊瑚: 16, coral: 16,
  紫: 275, purple: 275, violet: 275, 薰衣草: 265, lavender: 265, 葡萄: 285,
  橙: 28, orange: 28, 日落: 24, sunset: 24, 杏: 32, amber: 38,
  青: 185, cyan: 185, teal: 178, 湖: 182, 松石: 175,
  粉: 335, pink: 335, 樱花: 340, 桃: 350, peach: 355,
  黄: 45, yellow: 45, 金: 42, gold: 42, 柠檬: 52, lemon: 52,
  夜: 250, night: 250, 星空: 245, galaxy: 255, 深海: 230, 宇宙: 258,
  苹果: 130, 草地: 120, 咖啡: 25, chocolate: 25, 巧克力: 25,
};

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 100000;
  }
  return hash;
}

function detectHue(prompt: string): number {
  const lower = prompt.toLowerCase();
  for (const [keyword, hue] of Object.entries(KEYWORD_HUES)) {
    if (lower.includes(keyword.toLowerCase())) {
      return hue;
    }
  }
  // 未命中关键词：用提示词哈希在完整色环上取值，保证同一提示词结果稳定
  return hashString(prompt) % 360;
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const val = ln - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
    return Math.round(255 * val)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** 生成 10 级色阶（0 最浅 → 9 最深），索引 6 为标准主色 */
function buildShades(hue: number): string[] {
  const saturation = 62 + (hue % 3) * 4;
  const lightness = [95, 90, 84, 76, 68, 60, 52, 45, 36, 28];
  return lightness.map((l) => hslToHex(hue, saturation, l));
}

export interface LocalThemeConfig {
  primaryColor: string;
  colors: { brand: string[] };
  description: string;
}

export function generateThemeConfig(prompt: string): LocalThemeConfig {
  const hue = detectHue(prompt);
  return {
    primaryColor: 'brand',
    colors: { brand: buildShades(hue) },
    description: prompt.trim().slice(0, 60),
  };
}

/**
 * 模拟流式返回：将 JSON 以小块异步产出，驱动抽屉的打字机显示效果。
 */
export async function* streamThemeJson(
  prompt: string,
  chunkDelayMs = 45,
): AsyncGenerator<string> {
  const config = generateThemeConfig(prompt);
  const json = JSON.stringify(config, null, 2);
  const wrapped = '```json\n' + json + '\n```';

  let buffer = wrapped;
  while (buffer.length > 0) {
    const size = 24 + Math.floor(Math.random() * 40);
    yield buffer.slice(0, size);
    buffer = buffer.slice(size);
    await new Promise((r) => setTimeout(r, chunkDelayMs));
  }
}
