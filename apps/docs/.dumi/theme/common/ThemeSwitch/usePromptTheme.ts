import { useRef, useState } from 'react';

import type { SiteContextProps } from '../../../theme/slots/SiteContext';

import { streamThemeJson } from './localThemeGenerator';

const fetchTheme = async (
  prompt: string,
  update: (currentFullContent: string) => void,
  abortSignal?: AbortSignal,
) => {
  // 本地生成器：按提示词推导配色并模拟流式输出，无需外部服务。
  // 支持通过 AbortSignal 取消（与原远端实现行为一致）。
  let fullContent = '';

  for await (const chunk of streamThemeJson(prompt)) {
    if (abortSignal?.aborted) {
      throw Object.assign(new Error('Request was aborted'), { name: 'AbortError' });
    }
    fullContent += chunk;
    update(fullContent);
  }

  return fullContent;
};

// Remove '```json' code block from the response
function getJsonText(raw: string, rmComment = false): string {
  const replaced = raw.trim().replace(/^```json\s*|\s*```$/g, '');

  return rmComment ? replaced.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '').trim() : replaced;
}

export default function usePromptTheme(
  onThemeChange?: (themeConfig: SiteContextProps['dynamicTheme']) => void,
) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resText, setResText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const submitPrompt = async (nextPrompt: string) => {
    if (!nextPrompt.trim()) {
      return;
    }

    setPrompt(nextPrompt);

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setResText('');
    setErrorMessage(undefined);

    try {
      const data = await fetchTheme(
        nextPrompt,
        (currentContent) => {
          setResText(currentContent);
        },
        abortController.signal,
      );

      // Handle the response
      if (data && onThemeChange) {
        const nextConfig = JSON.parse(getJsonText(data, true));
        onThemeChange(nextConfig);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('Request was aborted');
      } else {
        console.error('Failed to generate theme:', error);
        setErrorMessage(
          error instanceof SyntaxError
            ? 'Failed to parse the generated theme. Please try again.'
            : error instanceof Error
              ? error.message
              : 'Failed to generate theme',
        );
      }
    } finally {
      if (abortControllerRef.current === abortController) {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  return [
    submitPrompt,
    loading,
    prompt,
    getJsonText(resText),
    cancelRequest,
    errorMessage,
  ] as const;
}
