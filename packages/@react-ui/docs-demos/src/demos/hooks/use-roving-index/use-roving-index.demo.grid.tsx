import { SimpleGrid, UnstyledButton } from '@react-ui/ui';
import { useRovingIndex } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { SimpleGrid, UnstyledButton } from '@react-ui/ui';
import { useRovingIndex } from '@react-ui/hooks';

function Demo() {
  const total = 9;
  const columns = 3;

  const { getItemProps, focusedIndex } = useRovingIndex({
    total,
    columns,
  });

  return (
    <SimpleGrid cols={columns} w={300} spacing="xs">
      {Array.from({ length: total }, (_, index) => (
        <UnstyledButton
          key={index}
          {...getItemProps({ index })}
          p="md"
          ta="center"
          style={{
            borderRadius: 'var(--ui-radius-sm)',
            border: '1px solid var(--ui-color-default-border)',
            backgroundColor:
              focusedIndex === index
                ? 'var(--ui-color-blue-light)'
                : undefined,
          }}
        >
          Cell {index + 1}
        </UnstyledButton>
      ))}
    </SimpleGrid>
  );
}
`;

function Demo() {
  const total = 9;
  const columns = 3;

  const { getItemProps, focusedIndex } = useRovingIndex({
    total,
    columns,
  });

  return (
    <SimpleGrid cols={columns} w={300} spacing="xs">
      {Array.from({ length: total }, (_, index) => (
        <UnstyledButton
          key={index}
          {...getItemProps({ index })}
          p="md"
          ta="center"
          style={{
            borderRadius: 'var(--ui-radius-sm)',
            border: '1px solid var(--ui-color-default-border)',
            backgroundColor: focusedIndex === index ? 'var(--ui-color-blue-light)' : undefined,
          }}
        >
          Cell {index + 1}
        </UnstyledButton>
      ))}
    </SimpleGrid>
  );
}

export const grid: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
