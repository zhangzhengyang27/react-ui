import { Button, ButtonFactory, Group, PartialVarsResolver } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const inlineCode = `
import { Button, PartialVarsResolver, ButtonFactory, Group } from '@react-ui/ui';

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
import { Button, Group, MantineProvider, createTheme } from '@react-ui/ui';

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
    <MantineProvider theme={theme}>
      <Group>
        <Button size="xxl">XXL Button</Button>
        <Button size="xxs">XXS Button</Button>
      </Group>
    </MantineProvider>
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

export const vars: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { code: providerCode, language: 'tsx', fileName: 'MantineProvider.tsx' },
    { code: inlineCode, language: 'tsx', fileName: 'Inline.tsx' },
  ],
};
