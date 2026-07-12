import { Stack, UnstyledButton } from '@react-ui/ui';
import { useRovingIndex } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Stack, UnstyledButton } from '@react-ui/ui';
import { useRovingIndex } from '@react-ui/hooks';

const items = ['General', 'Account', 'Security', 'Notifications', 'Privacy'];

function Demo() {
  const { getItemProps, focusedIndex } = useRovingIndex({
    total: items.length,
    orientation: 'vertical',
    loop: true,
  });

  return (
    <Stack gap={4} w={200}>
      {items.map((item, index) => (
        <UnstyledButton
          key={item}
          {...getItemProps({ index })}
          p="xs"
          style={{
            borderRadius: 'var(--ui-radius-sm)',
            backgroundColor:
              focusedIndex === index
                ? 'var(--ui-color-blue-light)'
                : undefined,
          }}
        >
          {item}
        </UnstyledButton>
      ))}
    </Stack>
  );
}
`;

const items = ['General', 'Account', 'Security', 'Notifications', 'Privacy'];

function Demo() {
  const { getItemProps, focusedIndex } = useRovingIndex({
    total: items.length,
    orientation: 'vertical',
    loop: true,
  });

  return (
    <Stack gap={4} w={200}>
      {items.map((item, index) => (
        <UnstyledButton
          key={item}
          {...getItemProps({ index })}
          p="xs"
          style={{
            borderRadius: 'var(--ui-radius-sm)',
            backgroundColor: focusedIndex === index ? 'var(--ui-color-blue-light)' : undefined,
          }}
        >
          {item}
        </UnstyledButton>
      ))}
    </Stack>
  );
}

export const vertical: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
