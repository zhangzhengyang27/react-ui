import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart'
import { ActionIcon, createTheme, Group, UIThemeProvider } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import classes from './ActionIcon.demo.customVariant.module.css'

const code = `
import { Group, ActionIcon, UIProvider, createTheme } from '@xiaoye-react/ui';
import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart';
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
    <UIProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xl" variant="danger" aria-label="危险变体">
          <HeartIcon />
        </ActionIcon>
        <ActionIcon size="xl" variant="primary" aria-label="主要变体">
          <HeartIcon />
        </ActionIcon>
      </Group>
    </UIProvider>
  );
}
`

const cssCode = `
.root {
  &[data-variant='danger'] {
    background-color: var(--ui-color-red-9);
    color: var(--ui-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--ui-color-white);
  }
}
`

const theme = createTheme({
    components: {
        ActionIcon: ActionIcon.extend({
            classNames: classes
        })
    }
})

function Demo() {
    return (
        <UIThemeProvider theme={theme}>
            <Group justify="center">
                <ActionIcon size="xl" variant="danger" aria-label="危险变体">
                    <HeartIcon />
                </ActionIcon>
                <ActionIcon size="xl" variant="primary" aria-label="主要变体">
                    <HeartIcon />
                </ActionIcon>
            </Group>
        </UIThemeProvider>
    )
}

export const customVariant: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    code: [
        { fileName: '演示代码.tsx', code, language: 'tsx' },
        { fileName: '演示样式.module.css', code: cssCode, language: 'scss' }
    ]
}
