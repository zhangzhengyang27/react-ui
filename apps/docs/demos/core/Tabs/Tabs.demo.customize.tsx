import { ChatCircleIcon } from '@phosphor-icons/react/dist/csr/ChatCircle'
import { GearSixIcon } from '@phosphor-icons/react/dist/csr/GearSix'
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image'
import { Tabs } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import classes from './Tabs.demo.customize.module.css'

const code = `
import { Tabs } from '@xiaoye-react/ui';
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image';
import { ChatCircleIcon } from '@phosphor-icons/react/dist/csr/ChatCircle';
import { GearSixIcon } from '@phosphor-icons/react/dist/csr/GearSix';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Tabs variant="unstyled" defaultValue="settings" classNames={classes}>
      <Tabs.List grow>
        <Tabs.Tab
          value="settings"
          leftSection={<GearSixIcon size={16} />}
        >
          设置
        </Tabs.Tab>
        <Tabs.Tab
          value="messages"
          leftSection={<ChatCircleIcon size={16} />}
        >
          消息
        </Tabs.Tab>
        <Tabs.Tab
          value="gallery"
          leftSection={<ImageIcon size={16} />}
        >
          相册
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
`
const cssCode = `
.tab {
  position: relative;
  border: 1px solid light-dark(var(--ui-color-gray-2), var(--ui-color-dark-4));
  background-color: light-dark(var(--ui-color-white), var(--ui-color-dark-6));

  &:first-of-type {
    border-radius: 4px 0 0 4px;

    [dir='rtl'] & {
      border-radius: 0 4px 4px 0;
    }
  }

  &:last-of-type {
    border-radius: 0 4px 4px 0;

    [dir='rtl'] & {
      border-radius: 4px 0 0 4px;
    }
  }

  & + & {
    border-left-width: 0;

    [dir='rtl'] & {
      border-right-width: 0;
      border-left-width: 1px;
    }
  }

  &:hover {
    background-color: light-dark(var(--ui-color-gray-0), var(--ui-color-dark-5));
  }

  &[data-active] {
    z-index: 1;
    background-color: var(--ui-color-blue-filled);
    border-color: var(--ui-color-blue-filled);
    color: var(--ui-color-white);

    &:hover {
      background-color: var(--ui-color-blue-filled-hover);
    }
  }
}
`

function Demo() {
    return (
        <Tabs variant="unstyled" defaultValue="settings" classNames={classes}>
            <Tabs.List grow>
                <Tabs.Tab value="settings" leftSection={<GearSixIcon size={16} />}>
                    设置
                </Tabs.Tab>
                <Tabs.Tab value="messages" leftSection={<ChatCircleIcon size={16} />}>
                    消息
                </Tabs.Tab>
                <Tabs.Tab value="gallery" leftSection={<ImageIcon size={16} />}>
                    相册
                </Tabs.Tab>
            </Tabs.List>
        </Tabs>
    )
}

export const customize: UIDemo = {
    type: 'code',
    component: Demo,
    code: [
        { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
        { fileName: '演示代码.tsx', code, language: 'tsx' }
    ]
}
