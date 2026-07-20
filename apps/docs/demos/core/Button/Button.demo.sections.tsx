import { ArrowRightIcon, DownloadSimpleIcon, ImageIcon } from '@phosphor-icons/react';
import { Button, Group } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Group, Button } from '@react-ui/ui';
import { ImageIcon, DownloadSimpleIcon, ArrowRightIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Group justify="center">
      <Button leftSection={<ImageIcon size={14} />} variant="default">
        相册
      </Button>

      <Button rightSection={<DownloadSimpleIcon size={14} />}>下载</Button>

      <Button
        variant="light"
        leftSection={<ImageIcon size={14} />}
        rightSection={<ArrowRightIcon size={14} />}
      >
        访问相册
      </Button>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <Button leftSection={<ImageIcon size={14} />} variant="default">
        相册
      </Button>

      <Button rightSection={<DownloadSimpleIcon size={14} />}>下载</Button>
      <Button
        variant="light"
        leftSection={<ImageIcon size={14} />}
        rightSection={<ArrowRightIcon size={14} className="ui-rotate-rtl" />}
      >
        访问相册
      </Button>
    </Group>
  );
}

export const sections: UIDemo = {
  type: 'code',
  component: Demo,
  title: '图标区域',
  description: '使用 leftSection 和 rightSection 在按钮中嵌入图标。',
  code,
};
