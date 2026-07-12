import { useState } from 'react';
import { Group, Text } from '@react-ui/ui';
import { useMove } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Group, Text } from '@react-ui/ui';
import { useMove } from '@react-ui/hooks';

function Demo() {
  const [value, setValue] = useState(0.2);
  const { ref } = useMove(({ y }) => setValue(1 - y));

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 16,
            height: 120,
            backgroundColor: 'var(--ui-color-blue-light)',
            position: 'relative',
          }}
        >
          {/* Filled bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              height: \`\${value * 100}%\`,
              width: 16,
              backgroundColor: 'var(--ui-color-blue-filled)',
              opacity: 0.7,
            }}
          />

          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              bottom: \`calc(\${value * 100}% - 8px)\`,
              left: 0,
              width: 16,
              height: 16,
              backgroundColor: 'var(--ui-color-blue-7)',
            }}
          />
        </div>
      </Group>

      <Text ta="center" mt="sm">
        Value: {Math.round(value * 100)}
      </Text>
    </>
  );
}`;

function Demo() {
  const [value, setValue] = useState(0.2);
  const { ref } = useMove(({ y }) => setValue(1 - y));

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 16,
            height: 120,
            backgroundColor: 'var(--ui-color-blue-light)',
            position: 'relative',
          }}
        >
          {/* Filled bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              height: `${value * 100}%`,
              width: 16,
              backgroundColor: 'var(--ui-color-blue-filled)',
              opacity: 0.7,
            }}
          />

          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              bottom: `calc(${value * 100}% - 8px)`,
              left: 0,
              width: 16,
              height: 16,
              backgroundColor: 'var(--ui-color-blue-7)',
            }}
          />
        </div>
      </Group>

      <Text ta="center" mt="sm">
        Value: {Math.round(value * 100)}
      </Text>
    </>
  );
}

export const vertical: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
