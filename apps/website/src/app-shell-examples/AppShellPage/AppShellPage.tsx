import { PageHead } from '@/components/PageHead';
import { AppShellDemo } from '@react-ui/docs-demos';
import { ExamplesDrawer } from './ExamplesDrawer/ExamplesDrawer';

export function AppShellPage() {
  return (
    <>
      <PageHead
        title="AppShell 示例"
        description="10+ 个 ReactUI AppShell 组件使用示例"
      />

      <div>
        <AppShellDemo />
        <ExamplesDrawer />
      </div>
    </>
  );
}
