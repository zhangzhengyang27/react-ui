import { DotsSixIcon, DotsSixVerticalIcon } from '@phosphor-icons/react';
import { useSplitter } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DotsSixVerticalIcon, DotsSixIcon } from '@phosphor-icons/react';
import { useSplitter } from '@xiaoye-react/hooks';

function Demo() {
  const horizontal = useSplitter({
    panels: [
      { defaultSize: 30, min: 15 },
      { defaultSize: 70, min: 30 },
    ],
  });

  const vertical = useSplitter({
    panels: [
      { defaultSize: 60, min: 20 },
      { defaultSize: 40, min: 20 },
    ],
    orientation: 'vertical',
  });

  return (
    <div
      ref={horizontal.ref}
      style={{
        display: 'flex',
        height: 350,
        borderRadius: 'var(--ui-radius-md)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: \`\${horizontal.sizes[0]}%\`,
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
        Panel A ({Math.round(horizontal.sizes[0] as number)}%)
      </div>
      <div
        {...horizontal.getHandleProps({ index: 0 })}
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
          <DotsSixVerticalIcon style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      <div
        ref={vertical.ref}
        style={{
          width: \`\${horizontal.sizes[1]}%\`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: \`\${vertical.sizes[0]}%\`,
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
          Panel B ({Math.round(vertical.sizes[0] as number)}%)
        </div>
        <div
          {...vertical.getHandleProps({ index: 0 })}
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
            <DotsSixIcon style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div
          style={{
            height: \`\${vertical.sizes[1]}%\`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--ui-color-grape-filled)',
            color: 'var(--ui-color-white)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            gap: 2,
          }}
        >
          Panel C ({Math.round(vertical.sizes[1] as number)}%)
        </div>
      </div>
    </div>
  );
}
`;

function Demo() {
  const horizontal = useSplitter({
    panels: [
      { defaultSize: 30, min: 15 },
      { defaultSize: 70, min: 30 },
    ],
  });

  const vertical = useSplitter({
    panels: [
      { defaultSize: 60, min: 20 },
      { defaultSize: 40, min: 20 },
    ],
    orientation: 'vertical',
  });

  return (
    <div
      ref={horizontal.ref}
      style={{
        display: 'flex',
        height: 350,
        borderRadius: 'var(--ui-radius-md)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${horizontal.sizes[0]}%`,
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
        Panel A ({Math.round(horizontal.sizes[0] as number)}%)
      </div>
      <div
        {...horizontal.getHandleProps({ index: 0 })}
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
          <DotsSixVerticalIcon style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      <div
        ref={vertical.ref}
        style={{
          width: `${horizontal.sizes[1]}%`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: `${vertical.sizes[0]}%`,
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
          Panel B ({Math.round(vertical.sizes[0] as number)}%)
        </div>
        <div
          {...vertical.getHandleProps({ index: 0 })}
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
            <DotsSixIcon style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div
          style={{
            height: `${vertical.sizes[1]}%`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--ui-color-grape-filled)',
            color: 'var(--ui-color-white)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            gap: 2,
          }}
        >
          Panel C ({Math.round(vertical.sizes[1] as number)}%)
        </div>
      </div>
    </div>
  );
}

export const nested: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
