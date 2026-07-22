import { useState } from 'react';
import { Code, Group, Text } from '@xiaoye-react/ui';
import { useMove } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Group, Text, Code } from '@xiaoye-react/ui';
import { useMove } from '@xiaoye-react/hooks';

function Demo() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 400,
            height: 120,
            backgroundColor: 'var(--ui-color-blue-light)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: \`calc(\${value.x * 100}% - 8px)\`,
              top: \`calc(\${value.y * 100}% - 8px)\`,
              width: 16,
              height: 16,
              backgroundColor: active ? 'var(--ui-color-teal-7)' : 'var(--ui-color-blue-7)',
            }}
          />
        </div>
      </Group>
      <Text ta="center" mt="sm">
        Values <Code>{\`{ x: \${Math.round(value.x * 100)}, y: \${Math.round(value.y * 100)} }\`}</Code>
      </Text>
    </>
  );
}`;

function Demo() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 400,
            height: 120,
            backgroundColor: 'var(--ui-color-blue-light)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `calc(${value.x * 100}% - 8px)`,
              top: `calc(${value.y * 100}% - 8px)`,
              width: 16,
              height: 16,
              backgroundColor: active
                ? 'var(--ui-color-teal-7)'
                : 'var(--ui-color-blue-7)',
            }}
          />
        </div>
      </Group>
      <Text ta="center" mt="sm">
        值 <Code>{`{ x: ${Math.round(value.x * 100)}, y: ${Math.round(value.y * 100)} }`}</Code>
      </Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
