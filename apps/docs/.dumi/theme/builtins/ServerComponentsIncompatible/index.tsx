import { MdxParagraph } from '../MdxShared/base';

export default function ServerComponentsIncompatible({ component }: { component: string }) {
  return (
    <MdxParagraph>
      <strong>注意：</strong> <code>{component}</code> 使用了 React 的 <code>useState</code>、
      <code>useEffect</code> 等钩子，因此不能在 React Server Components 中使用。
      如果你使用的是 Next.js App Router，请确保在组件文件顶部添加{' '}
      <code>"use client"</code> 指令。
    </MdxParagraph>
  );
}
