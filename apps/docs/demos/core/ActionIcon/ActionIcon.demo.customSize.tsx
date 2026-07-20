import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, createTheme, Group, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './ActionIcon.demo.customSize.module.css';

const code = `
import { ActionIcon, createTheme, Group, UIThemeProvider } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xxs" aria-label="自定义 xxs 尺寸">
          <HeartIcon size={10} />
        </ActionIcon>

        <ActionIcon size="xxl" aria-label="自定义 xxl 尺寸">
          <HeartIcon size={32} />
        </ActionIcon>
      </Group>
    </UIThemeProvider>
  );
}
`;

const cssCode = `
.root {
  --ai-size-xxs: 16px;
  --ai-size-xxl: 50px;
}
`;

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xxs" aria-label="自定义 xxs 尺寸">
          <HeartIcon size={10} />
        </ActionIcon>

        <ActionIcon size="xxl" aria-label="自定义 xxl 尺寸">
          <HeartIcon size={32} />
        </ActionIcon>
      </Group>
    </UIThemeProvider>
  );
}

export const customSize: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
