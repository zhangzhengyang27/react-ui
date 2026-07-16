import { useState } from 'react';
import { Button, Group, Menu, Menubar, Stack } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Group, Menu, Menubar, Stack } from '@react-ui/ui';

function Demo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Stack>
      <Group>
        <Button variant="default" onClick={() => setOpenIndex(0)}>打开文件</Button>
        <Button variant="default" onClick={() => setOpenIndex(1)}>打开编辑</Button>
        <Button variant="default" onClick={() => setOpenIndex(null)}>全部关闭</Button>
      </Group>

      <Menubar openIndex={openIndex} onOpenChange={setOpenIndex}>
        <Menubar.Menu width={220}>
          <Menubar.Target>文件</Menubar.Target>
          <Menubar.Dropdown>
            <Menu.Item>新建文件</Menu.Item>
            <Menu.Item>保存</Menu.Item>
          </Menubar.Dropdown>
        </Menubar.Menu>

        <Menubar.Menu width={220}>
          <Menubar.Target>编辑</Menubar.Target>
          <Menubar.Dropdown>
            <Menu.Item>撤销</Menu.Item>
            <Menu.Item>重做</Menu.Item>
          </Menubar.Dropdown>
        </Menubar.Menu>
      </Menubar>
    </Stack>
  );
}
`;

function Demo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Stack>
      <Group>
        <Button variant="default" onClick={() => setOpenIndex(0)}>
          Open File
        </Button>
        <Button variant="default" onClick={() => setOpenIndex(1)}>
          Open Edit
        </Button>
        <Button variant="default" onClick={() => setOpenIndex(null)}>
          Close all
        </Button>
      </Group>

      <Menubar openIndex={openIndex} onOpenChange={setOpenIndex}>
        <Menubar.Menu width={220}>
          <Menubar.Target>文件</Menubar.Target>
          <Menubar.Dropdown>
            <Menu.Item>新建文件</Menu.Item>
            <Menu.Item>保存</Menu.Item>
          </Menubar.Dropdown>
        </Menubar.Menu>

        <Menubar.Menu width={220}>
          <Menubar.Target>编辑</Menubar.Target>
          <Menubar.Dropdown>
            <Menu.Item>撤销</Menu.Item>
            <Menu.Item>重做</Menu.Item>
          </Menubar.Dropdown>
        </Menubar.Menu>
      </Menubar>
    </Stack>
  );
}

export const controlled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
