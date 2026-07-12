import React from 'react';
import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { SplitterPaneSize, useSplitter } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import React from 'react';
import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { SplitterPaneSize, useSplitter } from '@react-ui/hooks';

const colors = ['var(--ui-color-blue-filled)', 'var(--ui-color-teal-filled)'];

function getPaneStyle(size: SplitterPaneSize): React.CSSProperties {
  if (typeof size === 'string' && (size.endsWith('px') || size.endsWith('rem'))) {
    return { flexGrow: 0, flexShrink: 1, flexBasis: size };
  }
  const weight = typeof size === 'number' ? size : parseFloat(size);
  return { flexGrow: weight, flexShrink: 1, flexBasis: 0 };
}

function Demo() {
  const splitter = useSplitter({
    panels: [
      { defaultSize: '240px', min: '160px', max: '50%' },
      { defaultSize: 100 },
    ],
  });

  const labels = ['Fixed 240px sidebar', 'Flexible content'];

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
      {splitter.sizes.map((size, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <div
              {...splitter.getHandleProps({ index: i - 1 })}
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
          )}
          <div
            style={{
              ...getPaneStyle(size),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors[i],
              color: 'var(--ui-color-white)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {labels[i]}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
`;

const colors = ['var(--ui-color-blue-filled)', 'var(--ui-color-teal-filled)'];

function getPaneStyle(size: SplitterPaneSize): React.CSSProperties {
  if (typeof size === 'string' && (size.endsWith('px') || size.endsWith('rem'))) {
    return { flexGrow: 0, flexShrink: 1, flexBasis: size };
  }
  const weight = typeof size === 'number' ? size : parseFloat(size);
  return { flexGrow: weight, flexShrink: 1, flexBasis: 0 };
}

function Demo() {
  const splitter = useSplitter({
    panels: [{ defaultSize: '240px', min: '160px', max: '50%' }, { defaultSize: 100 }],
  });

  const labels = ['Fixed 240px sidebar', 'Flexible content'];

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
      {splitter.sizes.map((size, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <div
              {...splitter.getHandleProps({ index: i - 1 })}
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
          )}
          <div
            style={{
              ...getPaneStyle(size),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors[i],
              color: 'var(--ui-color-white)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {labels[i]}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export const cssUnits: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
