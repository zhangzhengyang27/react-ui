import { ArrowRightIcon } from '@phosphor-icons/react';
import { Button, ButtonProps, Group } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import classes from './Styles.demo.dataAttributes.module.css';

const code = `
import { Button, ButtonProps, Group } from '@react-ui/ui';
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
        Send files
      </SendFilesButton>
      <SendFilesButton
        leftSection="3"
        rightSection={<ArrowRightIcon size={18} />}
        disabled
      >
        Send files
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
    @mixin light {
      border: 1px solid var(--ui-color-gray-2);
    }

    @mixin dark {
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
    @mixin rtl {
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
        Send files
      </SendFilesButton>
      <SendFilesButton leftSection="3" rightSection={<ArrowRightIcon size={18} />} disabled>
        Send files
      </SendFilesButton>
    </Group>
  );
}

export const dataAttributes: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
    { fileName: 'Demo.tsx', code, language: 'tsx' },
  ],
};
