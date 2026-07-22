import { Button, Group } from '@xiaoye-react/ui';
import { useRovingIndex } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group } from '@xiaoye-react/ui';
import { useRovingIndex } from '@xiaoye-react/hooks';

const items = ['Bold', 'Italic', 'Underline', 'Strikethrough', 'Code'];

function Demo() {
  const { getItemProps } = useRovingIndex({
    total: items.length,
    orientation: 'horizontal',
    loop: true,
  });

  return (
    <Group gap="xs">
      {items.map((item, index) => (
        <Button key={item} variant="default" {...getItemProps({ index })}>
          {item}
        </Button>
      ))}
    </Group>
  );
}
`;

const items = ['Bold', 'Italic', 'Underline', 'Strikethrough', 'Code'];

function Demo() {
  const { getItemProps } = useRovingIndex({
    total: items.length,
    orientation: 'horizontal',
    loop: true,
  });

  return (
    <Group gap="xs">
      {items.map((item, index) => (
        <Button key={item} variant="default" {...getItemProps({ index })}>
          {item}
        </Button>
      ))}
    </Group>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
