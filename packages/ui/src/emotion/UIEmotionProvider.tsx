import { createContext, use, type FC } from 'react';
import { __unsafe_useEmotionCache, EmotionCache, withEmotionCache } from '@emotion/react';

export const EmotionCacheContext = createContext<EmotionCache | null>(null);

/**
 * 取当前 emotion cache：优先用 UIEmotionProvider 注入的实例，否则回落到
 * @emotion/react 自己的全局 cache。
 * 早先实现在没包 UIEmotionProvider 时直接抛错，而 createStyles 无条件依赖本函数，
 * 导致只用 UIProvider 的应用（含本站文档）里 createStyles 一挂载就崩。
 */
export function useEmotionCache(): EmotionCache {
  const provided = use(EmotionCacheContext);
  const globalCache = __unsafe_useEmotionCache();
  const cache = provided ?? globalCache;

  if (!cache) {
    throw new Error(
      '[@xiaoye-react/ui] 未取到可用的 emotion cache（@emotion/react 的默认 cache 也不存在）'
    );
  }

  return cache;
}

interface EmotionCacheProviderProps {
  children: React.ReactNode;
  cache?: EmotionCache;
}

// 显式标注返回类型：省略时 TS 只能推断出指向 .pnpm 内部路径的类型，
// vite-plugin-dts 报 TS2742 后会跳过本文件的声明发射，导致发布产物里
// es/emotion/UIEmotionProvider.d.ts 缺失（消费方 import 直接 TS2307）。
export const UIEmotionProvider: FC<EmotionCacheProviderProps> = withEmotionCache<EmotionCacheProviderProps>(
  ({ children, cache }, ctx) => (
    <EmotionCacheContext value={cache || ctx}>{children}</EmotionCacheContext>
  )
);
