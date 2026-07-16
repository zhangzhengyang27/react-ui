import { ArrowSquareOutIcon, CodeIcon, EyeIcon } from '@phosphor-icons/react';
import { Center, SegmentedControl } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Center, SegmentedControl } from '@react-ui/ui';
import { EyeIcon, CodeIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <SegmentedControl
      data={[
        {
          value: 'preview',
          label: (
            <Center style={{ gap: 10 }}>
              <EyeIcon size={16} />
              <span>预览</span>
            </Center>
          ),
        },
        {
          value: 'code',
          label: (
            <Center style={{ gap: 10 }}>
              <CodeIcon size={16} />
              <span>代码</span>
            </Center>
          ),
        },
        {
          value: 'export',
          label: (
            <Center style={{ gap: 10 }}>
              <ArrowSquareOutIcon size={16} />
              <span>导出</span>
            </Center>
          ),
        },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <SegmentedControl
      data={[
        {
          value: 'preview',
          label: (
            <Center style={{ gap: 10 }}>
              <EyeIcon size={16} />
              <span>预览</span>
            </Center>
          ),
        },
        {
          value: 'code',
          label: (
            <Center style={{ gap: 10 }}>
              <CodeIcon size={16} />
              <span>代码</span>
            </Center>
          ),
        },
        {
          value: 'export',
          label: (
            <Center style={{ gap: 10 }}>
              <ArrowSquareOutIcon size={16} />
              <span>导出</span>
            </Center>
          ),
        },
      ]}
    />
  );
}

export const labels: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
