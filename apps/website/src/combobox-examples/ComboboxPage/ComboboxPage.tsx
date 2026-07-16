import { PageHead } from '@/components/PageHead';
import { ComboboxDemo } from '@react-ui/docs-demos';
import { ComboboxShell } from '../ComboboxShell/ComboboxShell';

export function ComboboxPage() {
  return (
    <>
      <PageHead
        title="Combobox 示例"
        description="50+ 个 ReactUI Combobox 组件使用示例"
      />
      <ComboboxShell>
        <ComboboxDemo />
      </ComboboxShell>
    </>
  );
}
