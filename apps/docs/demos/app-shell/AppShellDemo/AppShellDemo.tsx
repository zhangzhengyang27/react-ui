import { useEffect, useState } from 'react';
import { CodeHighlightTabs } from '@xiaoye-react/code-highlight';
import { getCodeFileIcon } from '@xiaoye-react/dev-icons';
import { APP_SHELL_EXAMPLES_COMPONENTS } from '../examples';

// 替代迁移前 next/router 的用法：直接读写 URL 查询参数（dumi 环境无 next/router）
export function AppShellDemo() {
  const [exampleId, setExampleId] = useState<string | undefined>(undefined);
  // state 也走 state + effect：渲染期直读 window.location 会在 ?s=code 直达时产生水合不一致
  const [state, setState] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('e');
    setState(params.get('s') ?? '');
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
