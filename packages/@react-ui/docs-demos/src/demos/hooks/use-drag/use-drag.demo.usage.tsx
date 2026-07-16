import { useRef, useState } from 'react';
import { Code, Group, Text } from '@react-ui/ui';
import { useDrag } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useRef, useState } from 'react';
import { Code, Group, Text } from '@react-ui/ui';
import { useDrag } from '@react-ui/hooks';

function Demo() {
  const posRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const { ref, active } = useDrag((state) => {
    if (state.first) {
      startPosRef.current = { ...posRef.current };
    }
    const newPos = {
      x: startPosRef.current.x + state.movement[0],
      y: startPosRef.current.y + state.movement[1],
    };
    posRef.current = newPos;
    setPos(newPos);
  });

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 200,
            height: 120,
            backgroundColor: active
              ? 'var(--ui-color-teal-filled)'
              : 'var(--ui-color-blue-filled)',
            borderRadius: 'var(--ui-radius-md)',
            transform: \`translate(\${pos.x}px, \${pos.y}px)\`,
            cursor: active ? 'grabbing' : 'grab',
            touchAction: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ui-color-white)',
            fontWeight: 600,
            userSelect: 'none',
          }}
        >
          Drag me
        </div>
      </Group>
      <Text ta="center" mt="sm" size="sm">
        Position: <Code>{\`{ x: \${Math.round(pos.x)}, y: \${Math.round(pos.y)} }\`}</Code>
      </Text>
    </>
  );
}
`;

function Demo() {
  const posRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const { ref, active } = useDrag((state) => {
    if (state.first) {
      startPosRef.current = { ...posRef.current };
    }
    const newPos = {
      x: startPosRef.current.x + state.movement[0],
      y: startPosRef.current.y + state.movement[1],
    };
    posRef.current = newPos;
    setPos(newPos);
  });

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 200,
            height: 120,
            backgroundColor: active
              ? 'var(--ui-color-teal-filled)'
              : 'var(--ui-color-blue-filled)',
            borderRadius: 'var(--ui-radius-md)',
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            cursor: active ? 'grabbing' : 'grab',
            touchAction: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ui-color-white)',
            fontWeight: 600,
            userSelect: 'none',
          }}
        >
          Drag me
        </div>
      </Group>
      <Text ta="center" mt="sm" size="sm">
        Position: <Code>{`{ x: ${Math.round(pos.x)}, y: ${Math.round(pos.y)} }`}</Code>
      </Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
