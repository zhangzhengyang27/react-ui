import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CodeHighlightTabs } from '@react-ui/code-highlight';
import { getCodeFileIcon } from '@react-ui/dev-icons';
import { APP_SHELL_EXAMPLES_COMPONENTS } from '../examples';

export function AppShellDemo() {
  const router = useRouter();
  const exampleId = router.query.e as string;
  const state = router.query.s as string;

  useEffect(() => {
    if (!exampleId || !(exampleId in APP_SHELL_EXAMPLES_COMPONENTS)) {
      router.replace('/app-shell?e=BasicAppShell');
    }
  }, [exampleId]);

  if (!(exampleId in APP_SHELL_EXAMPLES_COMPONENTS)) {
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
