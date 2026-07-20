import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { useSplitter } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { useSplitter } from '@react-ui/hooks';

function Demo() {
  const splitter = useSplitter({
    panels: [
      { defaultSize: 50, min: 20 },
      { defaultSize: 50, min: 20 },
    ],
  });

  return (
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
          gap: 2,
        }}
      >
        Panel A ({Math.round(splitter.sizes[0] as number)}%)
      </div>
      <div
        style={{
          width: 1,
          flexShrink: 0,
          backgroundColor: 'var(--ui-color-default-border)',
          position: 'relative',
        }}
      >
        <div
          {...splitter.getHandleProps({ index: 0 })}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 20,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'col-resize',
            touchAction: 'none',
            backgroundColor: 'var(--ui-color-default)',
            border: '1px solid var(--ui-color-default-border)',
            borderRadius: 'var(--ui-radius-sm)',
            color: 'var(--ui-color-dimmed)',
            zIndex: 1,
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
  );
}
`;

function Demo() {
  const splitter = useSplitter({
    panels: [
      { defaultSize: 50, min: 20 },
      { defaultSize: 50, min: 20 },
    ],
  });

  return (
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
          gap: 2,
        }}
      >
        Panel A ({Math.round(splitter.sizes[0] as number)}%)
      </div>
      <div
        style={{
          width: 1,
          flexShrink: 0,
          backgroundColor: 'var(--ui-color-default-border)',
          position: 'relative',
        }}
      >
        <div
          {...splitter.getHandleProps({ index: 0 })}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 20,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'col-resize',
            touchAction: 'none',
            backgroundColor: 'var(--ui-color-default)',
            border: '1px solid var(--ui-color-default-border)',
            borderRadius: 'var(--ui-radius-sm)',
            color: 'var(--ui-color-dimmed)',
            zIndex: 1,
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
  );
}

export const gripOnly: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
