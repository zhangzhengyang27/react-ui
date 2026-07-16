import { useRef, useState } from 'react';
import { Group, Text } from '@react-ui/ui';
import { useDrag } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useRef, useState } from 'react';
import { Group, Text } from '@react-ui/ui';
import { useDrag } from '@react-ui/hooks';

function Demo() {
  const xPosRef = useRef(0);
  const xStartRef = useRef(0);
  const [xPos, setXPos] = useState(0);

  const yPosRef = useRef(0);
  const yStartRef = useRef(0);
  const [yPos, setYPos] = useState(0);

  const { ref: xRef, active: xActive } = useDrag(
    (state) => {
      if (state.first) {
        xStartRef.current = xPosRef.current;
      }
      const x = xStartRef.current + state.movement[0];
      xPosRef.current = x;
      setXPos(x);
    },
    { axis: 'x' }
  );

  const { ref: yRef, active: yActive } = useDrag(
    (state) => {
      if (state.first) {
        yStartRef.current = yPosRef.current;
      }
      const y = yStartRef.current + state.movement[1];
      yPosRef.current = y;
      setYPos(y);
    },
    { axis: 'y' }
  );

  return (
    <>
      <Group justify="center" gap="xl">
        <div>
          <div
            ref={xRef}
            style={{
              width: 80,
              height: 80,
              backgroundColor: xActive
                ? 'var(--ui-color-teal-filled)'
                : 'var(--ui-color-blue-filled)',
              borderRadius: 'var(--ui-radius-md)',
              transform: \`translateX(\${xPos}px)\`,
              cursor: xActive ? 'grabbing' : 'grab',
              touchAction: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ui-color-white)',
              fontWeight: 600,
              userSelect: 'none',
            }}
          >
            X only
          </div>
          <Text ta="center" mt="xs" size="sm">x: {Math.round(xPos)}</Text>
        </div>
        <div>
          <div
            ref={yRef}
            style={{
              width: 80,
              height: 80,
              backgroundColor: yActive
                ? 'var(--ui-color-teal-filled)'
                : 'var(--ui-color-blue-filled)',
              borderRadius: 'var(--ui-radius-md)',
              transform: \`translateY(\${yPos}px)\`,
              cursor: yActive ? 'grabbing' : 'grab',
              touchAction: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ui-color-white)',
              fontWeight: 600,
              userSelect: 'none',
            }}
          >
            Y only
          </div>
          <Text ta="center" mt="xs" size="sm">y: {Math.round(yPos)}</Text>
        </div>
      </Group>
    </>
  );
}
`;

function Demo() {
  const xPosRef = useRef(0);
  const xStartRef = useRef(0);
  const [xPos, setXPos] = useState(0);

  const yPosRef = useRef(0);
  const yStartRef = useRef(0);
  const [yPos, setYPos] = useState(0);

  const { ref: xRef, active: xActive } = useDrag(
    (state) => {
      if (state.first) {
        xStartRef.current = xPosRef.current;
      }
      const x = xStartRef.current + state.movement[0];
      xPosRef.current = x;
      setXPos(x);
    },
    { axis: 'x' }
  );

  const { ref: yRef, active: yActive } = useDrag(
    (state) => {
      if (state.first) {
        yStartRef.current = yPosRef.current;
      }
      const y = yStartRef.current + state.movement[1];
      yPosRef.current = y;
      setYPos(y);
    },
    { axis: 'y' }
  );

  return (
    <>
      <Group justify="center" gap="xl">
        <div>
          <div
            ref={xRef}
            style={{
              width: 80,
              height: 80,
              backgroundColor: xActive
                ? 'var(--ui-color-teal-filled)'
                : 'var(--ui-color-blue-filled)',
              borderRadius: 'var(--ui-radius-md)',
              transform: `translateX(${xPos}px)`,
              cursor: xActive ? 'grabbing' : 'grab',
              touchAction: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ui-color-white)',
              fontWeight: 600,
              userSelect: 'none',
            }}
          >
            X only
          </div>
          <Text ta="center" mt="xs" size="sm">
            x: {Math.round(xPos)}
          </Text>
        </div>
        <div>
          <div
            ref={yRef}
            style={{
              width: 80,
              height: 80,
              backgroundColor: yActive
                ? 'var(--ui-color-teal-filled)'
                : 'var(--ui-color-blue-filled)',
              borderRadius: 'var(--ui-radius-md)',
              transform: `translateY(${yPos}px)`,
              cursor: yActive ? 'grabbing' : 'grab',
              touchAction: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ui-color-white)',
              fontWeight: 600,
              userSelect: 'none',
            }}
          >
            Y only
          </div>
          <Text ta="center" mt="xs" size="sm">
            y: {Math.round(yPos)}
          </Text>
        </div>
      </Group>
    </>
  );
}

export const axis: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
