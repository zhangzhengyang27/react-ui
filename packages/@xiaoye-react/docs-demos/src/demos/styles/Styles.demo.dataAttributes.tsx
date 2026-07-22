import { ArrowRightIcon } from '@phosphor-icons/react';
import { Button, ButtonProps, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Styles.demo.dataAttributes.module.css';

const code = `
import { Button, ButtonProps, Group } from '@xiaoye-react/ui';
import { ArrowRightIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

function SendFilesButton(props: ButtonProps & React.ComponentProps<'button'>) {
  return <Button {...props} classNames={classes} />;
}

function Demo() {
  return (
    <Group>
      <SendFilesButton
        leftSection="12"
        rightSection={<ArrowRightIcon size={18} />}
      >
        发送文件
      </SendFilesButton>
      <SendFilesButton
        leftSection="3"
        rightSection={<ArrowRightIcon size={18} />}
        disabled
      >
        发送文件
      </SendFilesButton>
    </Group>
  );
}
`;

const cssCode = `
.root {
  border-top-left-radius: var(--ui-radius-xl);
  border-bottom-left-radius: var(--ui-radius-xl);
  padding-left: 4px;

  /* The following styles will be applied only when button is disabled */
  &[data-disabled] {
    /* You can use ReactUI PostCSS mixins inside data attributes */
    [data-ui-color-scheme='light'] & {
      border: 1px solid var(--ui-color-gray-2);
    }

    [data-ui-color-scheme='dark'] & {
      border: 1px solid var(--ui-color-dark-4);
    }

    /* You can target child elements that are inside .root[data-disabled] */
    & .section[data-position='left'] {
      opacity: 0.6;
    }
  }
}

.section {
  /* Apply styles only to left section */
  &[data-position='left'] {
    --section-size: calc(var(--button-height) - 8px);

    background-color: var(--ui-color-body);
    color: var(--ui-color-text);
    height: var(--section-size);
    width: var(--section-size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--ui-radius-xl);
  }

  &[data-position='right'] {
    [dir='rtl'] & {
      transform: rotate(180deg);
    }
  }
}
`;

function SendFilesButton(props: ButtonProps & React.ComponentProps<'button'>) {
  return <Button {...props} classNames={classes} />;
}

function Demo() {
  return (
    <Group>
      <SendFilesButton leftSection="12" rightSection={<ArrowRightIcon size={18} />}>
        发送文件
      </SendFilesButton>
      <SendFilesButton leftSection="3" rightSection={<ArrowRightIcon size={18} />} disabled>
        发送文件
      </SendFilesButton>
    </Group>
  );
}

export const dataAttributes: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
    { fileName: '演示代码.tsx', code, language: 'tsx' },
  ],
};
