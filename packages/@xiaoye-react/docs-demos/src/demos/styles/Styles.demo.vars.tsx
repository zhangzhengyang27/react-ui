import { Button, ButtonFactory, Group, PartialVarsResolver } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const inlineCode = `
import { Button, PartialVarsResolver, ButtonFactory, Group } from '@xiaoye-react/ui';

const varsResolver: PartialVarsResolver<ButtonFactory> = (theme, props) => {
  if (props.size === 'xxl') {
    return {
      root: {
        '--button-height': '60px',
        '--button-padding-x': '30px',
        '--button-fz': '24px',
      },
    };
  }

  if (props.size === 'xxs') {
    return {
      root: {
        '--button-height': '24px',
        '--button-padding-x': '10px',
        '--button-fz': '10px',
      },
    };
  }

  return { root: {} };
};

function Demo() {
  return (
    <Group>
      <Button vars={varsResolver} size="xxl">
        XXL Button
      </Button>
      <Button vars={varsResolver} size="xxs">
        XXS Button
      </Button>
    </Group>
  );
}
`;

const providerCode = `
import { Button, Group, UIProvider, createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.size === 'xxl') {
          return {
            root: {
              '--button-height': '60px',
              '--button-padding-x': '30px',
              '--button-fz': '24px',
            },
          };
        }

        if (props.size === 'xxs') {
          return {
            root: {
              '--button-height': '24px',
              '--button-padding-x': '10px',
              '--button-fz': '10px',
            },
          };
        }

        return { root: {} };
      },
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Group>
        <Button size="xxl">XXL 按钮</Button>
        <Button size="xxs">XXS 按钮</Button>
      </Group>
    </UIProvider>
  );
}
`;

const varsResolver: PartialVarsResolver<ButtonFactory> = (_theme, props) => {
  if (props.size === 'xxl') {
    return {
      root: {
        '--button-height': '60px',
        '--button-padding-x': '30px',
        '--button-fz': '24px',
      },
    };
  }

  if (props.size === 'xxs') {
    return {
      root: {
        '--button-height': '24px',
        '--button-padding-x': '10px',
        '--button-fz': '10px',
      },
    };
  }

  return { root: {} };
};

Button.extend({
  vars: (_theme, props) => {
    if (props.size === 'xxl') {
      return {
        root: {
          '--button-height': '60px',
          '--button-padding-x': '30px',
          '--button-fz': '24px',
        },
      };
    }

    if (props.size === 'xxs') {
      return {
        root: {
          '--button-height': '24px',
          '--button-padding-x': '10px',
          '--button-fz': '10px',
        },
      };
    }

    return { root: {} };
  },
});

function Demo() {
  return (
    <Group>
      <Button vars={varsResolver} size="xxl">
        XXL Button
      </Button>
      <Button vars={varsResolver} size="xxs">
        XXS Button
      </Button>
    </Group>
  );
}

export const vars: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { code: providerCode, language: 'tsx', fileName: '主题提供者.tsx' },
    { code: inlineCode, language: 'tsx', fileName: '内联.tsx' },
  ],
};
