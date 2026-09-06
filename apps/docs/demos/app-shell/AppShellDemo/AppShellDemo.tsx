import { useEffect, useState } from 'react';
import { CodeHighlightTabs } from '@xiaoye-react/code-highlight';
import { getCodeFileIcon } from '@xiaoye-react/dev-icons';
import { APP_SHELL_EXAMPLES_COMPONENTS } from '../examples';

// 替代迁移前 next/router 的用法：直接读写 URL 查询参数（dumi 环境无 next/router）
export function AppShellDemo() {
  const [exampleId, setExampleId] = useState<string | undefined>(undefined);
  const state = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search).get('s') ?? '';

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('e');
    if (fromUrl && fromUrl in APP_SHELL_EXAMPLES_COMPONENTS) {
      setExampleId(fromUrl);
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set('e', 'BasicAppShell');
    window.history.replaceState(null, '', url);
    setExampleId('BasicAppShell');
  }, []);

  if (!exampleId || !(exampleId in APP_SHELL_EXAMPLES_COMPONENTS)) {
    return null;
  }

  const data =
    APP_SHELL_EXAMPLES_COMPONENTS[exampleId as keyof typeof APP_SHELL_EXAMPLES_COMPONENTS];

  return state === 'code' ? (
    <CodeHighlightTabs code={data.code} getFileIcon={getCodeFileIcon} />
  ) : (
    <data.component />
  );
}
