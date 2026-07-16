import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

function Demo() {
  const gradient =
    'linear-gradient(45deg, var(--ui-color-pink-filled) 0%, var(--ui-color-orange-filled) 50%, var(--ui-color-yellow-filled) 100%)';

  return (
    <Button
      styles={{
        root: {
          padding: 2,
          border: 0,
          backgroundImage: gradient,
        },

        inner: {
          background: 'var(--ui-color-body)',
          color: 'var(--ui-color-text)',
          borderRadius: 'calc(var(--button-radius) - 2px)',
          paddingLeft: 'var(--ui-spacing-md)',
          paddingRight: 'var(--ui-spacing-md)',
        },

        label: {
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      渐变按钮
    </Button>
  );
}
`;

function Demo() {
  const gradient =
    'linear-gradient(45deg, var(--ui-color-pink-filled) 0%, var(--ui-color-orange-filled) 50%, var(--ui-color-yellow-filled) 100%)';

  return (
    <Button
      styles={{
        root: {
          padding: 2,
          border: 0,
          backgroundImage: gradient,
        },

        inner: {
          background: 'var(--ui-color-body)',
          color: 'var(--ui-color-text)',
          borderRadius: 'calc(var(--button-radius) - 2px)',
          paddingLeft: 'var(--ui-spacing-md)',
          paddingRight: 'var(--ui-spacing-md)',
        },

        label: {
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      渐变按钮
    </Button>
  );
}

export const styles: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
