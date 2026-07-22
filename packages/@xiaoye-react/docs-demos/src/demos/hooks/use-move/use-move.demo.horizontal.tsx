import { useState } from 'react';
import { Group, Text } from '@xiaoye-react/ui';
import { useMove } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Group, Text } from '@xiaoye-react/ui';
import { useMove } from '@xiaoye-react/hooks';

function Demo() {
  const [value, setValue] = useState(0.2);
  const { ref } = useMove(({ x }) => setValue(x));

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 400,
            height: 16,
            backgroundColor: 'var(--ui-color-blue-light)',
            position: 'relative',
          }}
        >
          {/* Filled bar */}
          <div
            style={{
              width: \`\${value * 100}%\`,
              height: 16,
              backgroundColor: 'var(--ui-color-blue-filled)',
              opacity: 0.7,
            }}
          />

          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              left: \`calc(\${value * 100}% - 8px)\`,
              top: 0,
              width: 16,
              height: 16,
              backgroundColor: 'var(--ui-color-blue-7)',
            }}
          />
        </div>
      </Group>

      <Text ta="center" mt="sm">
        值：{Math.round(value * 100)}
      </Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState(0.2);
  const { ref } = useMove(({ x }) => setValue(x));

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 400,
            height: 16,
            backgroundColor: 'var(--ui-color-blue-light)',
            position: 'relative',
          }}
        >
          {/* Filled bar */}
          <div
            style={{
              width: `${value * 100}%`,
              height: 16,
              backgroundColor: 'var(--ui-color-blue-filled)',
              opacity: 0.7,
            }}
          />

          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              left: `calc(${value * 100}% - 8px)`,
              top: 0,
              width: 16,
              height: 16,
              backgroundColor: 'var(--ui-color-blue-7)',
            }}
          />
        </div>
      </Group>

      <Text ta="center" mt="sm">
        值：{Math.round(value * 100)}
      </Text>
    </>
  );
}

export const horizontal: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
