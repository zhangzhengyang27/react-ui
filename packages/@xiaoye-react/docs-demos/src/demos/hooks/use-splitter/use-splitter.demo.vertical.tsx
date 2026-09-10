import React from 'react'
import { DotsSixIcon } from '@phosphor-icons/react/dist/csr/DotsSix'
import { useSplitter } from '@xiaoye-react/hooks'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import React from 'react';
import { DotsSixIcon } from '@phosphor-icons/react/dist/csr/DotsSix';
import { useSplitter } from '@xiaoye-react/hooks';

const colors = ['var(--ui-color-blue-filled)', 'var(--ui-color-teal-filled)'];
const labels = ['Panel A', 'Panel B'];

function Demo() {
  const splitter = useSplitter({
    panels: [
      { defaultSize: 50, min: 20 },
      { defaultSize: 50, min: 20 },
    ],
    orientation: 'vertical',
  });

  return (
    <div
      ref={splitter.ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 300,
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
                height: 4,
                flexShrink: 0,
                cursor: 'row-resize',
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
                  width: 40,
                  height: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--ui-radius-xs)',
                  backgroundColor: 'var(--ui-color-default)',
                  border: '1px solid var(--ui-color-default-border)',
                  color: 'var(--ui-color-dimmed)',
                }}
              >
                <DotsSixIcon />
              </div>
            </div>
          )}
          <div
            style={{
              height: \`\${size}%\`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors[i],
              color: 'var(--ui-color-white)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              gap: 2,
            }}
          >
            {labels[i]} ({Math.round(size as number)}%)
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
`

const colors = ['var(--ui-color-blue-filled)', 'var(--ui-color-teal-filled)']
const labels = ['Panel A', 'Panel B']

function Demo() {
    const splitter = useSplitter({
        panels: [
            { defaultSize: 50, min: 20 },
            { defaultSize: 50, min: 20 }
        ],
        orientation: 'vertical'
    })

    return (
        <div
            ref={splitter.ref}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: 300,
                borderRadius: 'var(--ui-radius-md)',
                overflow: 'hidden'
            }}
        >
            {splitter.sizes.map((size, i) => (
                <React.Fragment key={i}>
                    {i > 0 && (
                        <div
                            {...splitter.getHandleProps({ index: i - 1 })}
                            style={{
                                height: 4,
                                flexShrink: 0,
                                cursor: 'row-resize',
                                touchAction: 'none',
                                backgroundColor: 'var(--ui-color-default-border)',
                                position: 'relative'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 40,
                                    height: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 'var(--ui-radius-xs)',
                                    backgroundColor: 'var(--ui-color-default)',
                                    border: '1px solid var(--ui-color-default-border)',
                                    color: 'var(--ui-color-dimmed)'
                                }}
                            >
                                <DotsSixIcon />
                            </div>
                        </div>
                    )}
                    <div
                        style={{
                            height: `${size}%`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors[i],
                            color: 'var(--ui-color-white)',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            gap: 2
                        }}
                    >
                        {labels[i]} ({Math.round(size as number)}%)
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export const vertical: UIDemo = {
    type: 'code',
    code,
    component: Demo
}
