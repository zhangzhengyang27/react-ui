import { useRef, useState } from 'react';

import type { SiteContextProps } from '../../../theme/slots/SiteContext';

type SSEChunk = {
  event?: string;
  data?: string;
};

type ThemeStreamData = {
  lane?: string;
  payload?: string;
  type?: string;
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

const fetchTheme = async (
  prompt: string,
  update: (currentFullContent: string) => void,
  abortSignal?: AbortSignal,
) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: prompt,
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
      if (!chunk.data || chunk.data === '[DONE]') {
        continue;
      }

      if (chunk.event !== 'message' && chunk.event !== 'error') {
        continue;
      }

      let data: ThemeStreamData;

      try {
        data = JSON.parse(chunk.data) as ThemeStreamData;
      } catch (error) {
        if (chunk.event === 'error') {
          throw new Error(chunk.data);
        }

        throw error;
      }

      if (chunk.event === 'error' || data.type === 'error') {
        let errorMessage = 'Failed to generate theme';

        try {
          const payload = JSON.parse(data.payload || '{}') as {
            errorMsg?: string;
          };

          errorMessage = payload.errorMsg || errorMessage;
        } catch {
          if (data.payload) {
            errorMessage = data.payload;
          }
        }

        throw new Error(errorMessage);
      }

      if (chunk.event === 'message') {
        const payload = JSON.parse(data.payload || '{}') as {
          text: string;
        };

        fullContent += payload.text || '';
        update(fullContent);
      }
    }

    return fullContent;
  } catch (error) {
    console.error('Error in fetchTheme:', error);
    throw error;
  }
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
