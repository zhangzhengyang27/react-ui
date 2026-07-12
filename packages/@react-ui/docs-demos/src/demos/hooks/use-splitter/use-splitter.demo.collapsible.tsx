import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { Button, Group } from '@react-ui/ui';
import { useSplitter } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { Button, Group } from '@react-ui/ui';
import { useSplitter } from '@react-ui/hooks';

function Demo() {
  const splitter = useSplitter({
    panels: [
      { defaultSize: 30, collapsible: true, min: 15 },
      { defaultSize: 70, min: 20 },
    ],
  });

  return (
    <>
      <div
        ref={splitter.ref}
        style={{
          display: 'flex',
          height: 200,
          borderRadius: 'var(--ui-radius-md)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: \`\${splitter.sizes[0]}%\`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--ui-color-blue-filled)',
            color: 'var(--ui-color-white)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            gap: 2,
          }}
        >
          {!splitter.collapsed[0] && \`Panel A (\${Math.round(splitter.sizes[0] as number)}%)\`}
        </div>
        <div
          {...splitter.getHandleProps({ index: 0 })}
          style={{
            width: 4,
            flexShrink: 0,
            cursor: 'col-resize',
            touchAction: 'none',
            backgroundColor: 'var(--ui-color-default-border)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 8,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--ui-radius-xs)',
              backgroundColor: 'var(--ui-color-default)',
              border: '1px solid var(--ui-color-default-border)',
              color: 'var(--ui-color-dimmed)',
            }}
          >
            <DotsSixVerticalIcon />
          </div>
        </div>
        <div
          style={{
            width: \`\${splitter.sizes[1]}%\`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--ui-color-teal-filled)',
            color: 'var(--ui-color-white)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            gap: 2,
          }}
        >
          Panel B ({Math.round(splitter.sizes[1] as number)}%)
        </div>
      </div>
      <Group mt="md">
        <Button size="xs" onClick={() => splitter.toggleCollapse(0)}>
          {splitter.collapsed[0] ? 'Expand Panel A' : 'Collapse Panel A'}
        </Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const splitter = useSplitter({
    panels: [
      { defaultSize: 30, collapsible: true, min: 15 },
      { defaultSize: 70, min: 20 },
    ],
  });

  return (
    <>
      <div
        ref={splitter.ref}
        style={{
          display: 'flex',
          height: 200,
          borderRadius: 'var(--ui-radius-md)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${splitter.sizes[0]}%`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--ui-color-blue-filled)',
            color: 'var(--ui-color-white)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            gap: 2,
          }}
        >
          {!splitter.collapsed[0] && `Panel A (${Math.round(splitter.sizes[0] as number)}%)`}
        </div>
        <div
          {...splitter.getHandleProps({ index: 0 })}
          style={{
            width: 4,
            flexShrink: 0,
            cursor: 'col-resize',
            touchAction: 'none',
            backgroundColor: 'var(--ui-color-default-border)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 8,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--ui-radius-xs)',
              backgroundColor: 'var(--ui-color-default)',
              border: '1px solid var(--ui-color-default-border)',
              color: 'var(--ui-color-dimmed)',
            }}
          >
            <DotsSixVerticalIcon />
          </div>
        </div>
        <div
          style={{
            width: `${splitter.sizes[1]}%`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--ui-color-teal-filled)',
            color: 'var(--ui-color-white)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            gap: 2,
          }}
        >
          Panel B ({Math.round(splitter.sizes[1] as number)}%)
        </div>
      </div>
      <Group mt="md">
        <Button size="xs" onClick={() => splitter.toggleCollapse(0)}>
          {splitter.collapsed[0] ? 'Expand Panel A' : 'Collapse Panel A'}
        </Button>
      </Group>
    </>
  );
}

export const collapsible: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
