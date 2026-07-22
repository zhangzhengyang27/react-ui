import { Group, Text, useUITheme } from '@xiaoye-react/ui';
import { useElementSize } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useElementSize } from '@xiaoye-react/hooks';

function Demo() {
  const { ref, width, height } = useElementSize();

  return (
    <>
      <textarea ref={ref} style={{ width: 400, height: 120 }} />
      <div>Width: {width}, height: {height}</div>
    </>
  );
}`;

function Demo() {
  const theme = useUITheme();
  const { ref, width, height } = useElementSize();

  return (
    <>
      <Text ta="center" size="sm" style={{ marginBottom: theme.spacing.xs }}>
        Resize textarea by dragging its right bottom corner
      </Text>

      <Group justify="center">
        <textarea
          ref={ref}
          aria-label="拖动我"
          style={{
            width: 400,
            height: 120,
            border: 'none',
            backgroundColor: 'var(--ui-color-body)',
            position: 'relative',
          }}
        />
      </Group>
      <Text ta="center" mt="sm">
        Width: {width}, height: {height}
      </Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  dimmed: true,
};
