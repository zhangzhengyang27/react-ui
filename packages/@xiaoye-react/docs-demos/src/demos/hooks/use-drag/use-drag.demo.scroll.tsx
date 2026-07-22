import { useRef } from 'react';
import { Text } from '@xiaoye-react/ui';
import { useDrag } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useRef } from 'react';
import { Text } from '@xiaoye-react/ui';
import { useDrag } from '@xiaoye-react/hooks';

function Demo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { ref, active } = useDrag(
    (state) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft -= state.delta[0];
      }
    },
    { axis: 'x', filterTaps: true, threshold: 5 }
  );

  const assignRef = (node: HTMLDivElement | null) => {
    scrollRef.current = node;
    ref(node);
  };

  return (
    <>
      <div
        ref={assignRef}
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          cursor: active ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
          borderRadius: 'var(--ui-radius-md)',
          border: '1px solid var(--ui-color-default-border)',
          padding: 'var(--ui-spacing-md)',
        }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 80,
              marginRight: 12,
              backgroundColor: \`hsl(\${i * 18}, 60%, 70%)\`,
              borderRadius: 'var(--ui-radius-sm)',
              fontWeight: 600,
              verticalAlign: 'top',
            }}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <Text ta="center" mt="sm" size="sm" c="dimmed">
        Drag horizontally to scroll
      </Text>
    </>
  );
}
`;

function Demo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { ref, active } = useDrag(
    (state) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft -= state.delta[0];
      }
    },
    { axis: 'x', filterTaps: true, threshold: 5 }
  );

  const assignRef = (node: HTMLDivElement | null) => {
    scrollRef.current = node;
    ref(node);
  };

  return (
    <>
      <div
        ref={assignRef}
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          cursor: active ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
          borderRadius: 'var(--ui-radius-md)',
          border: '1px solid var(--ui-color-default-border)',
          padding: 'var(--ui-spacing-md)',
        }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 80,
              marginRight: 12,
              backgroundColor: `hsl(${i * 18}, 60%, 70%)`,
              borderRadius: 'var(--ui-radius-sm)',
              fontWeight: 600,
              verticalAlign: 'top',
              color: 'var(--ui-color-black)',
            }}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <Text ta="center" mt="sm" size="sm" c="dimmed">
        Drag horizontally to scroll
      </Text>
    </>
  );
}

export const scroll: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
