import { useRef, useState } from 'react';

type SSEChunk = {
  event?: string;
  data?: string;
};

/**
 * Parse a Server-Sent Events stream (Uint8Array) into SSE chunks.
 * Replaces the former `XStream` from `@ant-design/x-sdk`.
 */
async function* parseSSEStream(
  readableStream: ReadableStream<Uint8Array> | null,
  abortSignal?: AbortSignal,
): AsyncGenerator<SSEChunk> {
  if (!readableStream) {
    throw new Error('Response body is null');
  }

  const reader = readableStream.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  const flushBuffer = function* (): Generator<SSEChunk> {
    if (!buffer.trim()) return;
    const chunk = parseSSEPart(buffer);
    if (chunk) yield chunk;
    buffer = '';
  };

  try {
    while (true) {
      if (abortSignal?.aborted) {
        break;
      }
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      buffer += decoder.decode(value, { stream: true });

      // SSE events are separated by a blank line (\n\n)
      const parts = buffer.split('\n\n');
      buffer = parts.pop() ?? '';

      for (const part of parts) {
        const chunk = parseSSEPart(part);
        if (chunk) yield chunk;
      }
    }

    buffer += decoder.decode();
    yield* flushBuffer();
  } finally {
    reader.releaseLock();
  }
}

function parseSSEPart(part: string): SSEChunk | null {
  if (!part.trim()) return null;
  const lines = part.split('\n');
  const chunk: SSEChunk = {};
  for (const line of lines) {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    if (!key) continue;
    const val = line.slice(separatorIndex + 1).trim();
    chunk[key as 'event' | 'data'] = val;
  }
  return Object.keys(chunk).length > 0 ? chunk : null;
}

const locales = {
  cn: {
    recommendPrompt:
      '请生成 4 个 Tailwindcss 主题描述词，需要多样化的 UI 设计风格，用于 react-ui 主题生成器推荐。参考官方内建风格：暗黑风格、类 MUI 风格、类 shadcn 风格、卡通风格、插画风格、类 Bootstrap 拟物化风格、玻璃风格、极客风格。回复格式：用逗号分隔。',
  },
  en: {
    recommendPrompt:
      'Generate 4 Tailwind CSS theme names featuring diverse UI design styles for an react-ui theme generator recommendation. Reference the official built-in styles: Dark, MUI-like, shadcn-like, Cartoon, Illustration, Bootstrap-like Skeuomorphic, Glassmorphism, and Geek. Output format: comma-separated.',
  },
};

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

const fetchRecommendations = async (
  localeKey: keyof typeof locales,
  abortSignal?: AbortSignal,
): Promise<string[]> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: locales[localeKey].recommendPrompt,
      userId: 'ReactUISite',
    }),
    signal: abortSignal,
  };

  try {
    const response = await fetch('https://api.x.ant.design/api/agent_tbox_antd', options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    let fullContent = '';

    for await (const chunk of parseSSEStream(response.body, abortSignal)) {
      if (chunk.event === 'message') {
        try {
          const data = JSON.parse(chunk.data!) as {
            lane: string;
            payload: string;
          };

          const payload = JSON.parse(data.payload) as {
            text: string;
          };

          fullContent += payload.text || '';
        } catch {
          // Skip malformed chunks and continue
        }
      }
    }

    // Parse theme names from response - separated by commas
    const text = fullContent.trim();
    const items = text
      .split(/[，,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
    const result = items.slice(0, 4);

    // If parsing failed or got no results, use fallback
    if (result.length === 0) {
      return FALLBACK_THEMES[localeKey];
    }
    return result;
  } catch (error) {
    // Don't log AbortError - it's expected when cancelling requests
    if (error instanceof Error && error.name === 'AbortError') {
      throw error; // Re-throw AbortError to be handled by caller
    }
    console.error('Error in fetchRecommendations:', error);
    // Return fallback themes
    return FALLBACK_THEMES[localeKey];
  }
};

export default function usePromptRecommend(localeKey: keyof typeof locales = 'cn') {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const fetchedKeyRef = useRef<string>('');

  const fetch = async (key: string) => {
    if (fetchedKeyRef.current === key) {
      return;
    }

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);

    try {
      const items = await fetchRecommendations(localeKey, abortController.signal);
      setRecommendations(items);
      fetchedKeyRef.current = key;
    } catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError')) {
        console.error('Failed to fetch recommendations:', error);
        // Use fallback on error
        setRecommendations(FALLBACK_THEMES[localeKey]);
        fetchedKeyRef.current = key;
      }
    } finally {
      // Only clear loading and controller if this is still the active request
      if (abortControllerRef.current === abortController) {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  return { recommendations, loading, fetch };
}
