import type { CSSProperties } from 'react';
import { SimpleGrid, Text } from '@xiaoye-react/ui';
import { DemoArea, DemoAreaProps } from './DemoArea';

export interface DemoColumnsProps extends DemoAreaProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  withGrid?: boolean;
  controls: React.ReactNode;
}

export function DemoColumns({
  children,
  withPadding,
  centered,
  maxWidth,
  minHeight,
  title,
  description,
  controls,
  dimmed,
  striped,
  overflow,
  withGrid,
}: DemoColumnsProps) {
  const rootStyle: CSSProperties = { containerType: 'inline-size' };
  const columnsStyle: CSSProperties = { display: 'flex' };
  const controlsStyle: CSSProperties = {
    flex: '0 0 250px',
    borderInlineStart: '1px solid var(--demo-border, #f0f0f0)',
    padding: '4px',
  };

  return (
    <div style={rootStyle}>
      <div style={columnsStyle}>
        <DemoArea
          withPadding={withPadding}
          maxWidth={maxWidth}
          minHeight={minHeight}
          centered={centered}
          dimmed={dimmed}
          striped={striped}
          overflow={overflow}
        >
          {children}
        </DemoArea>

        <div style={controlsStyle}>
          {title && (
            <div style={{ paddingBottom: 'var(--ui-spacing-xs, 4px)', marginBottom: 'var(--ui-spacing-xs, 4px)' }}>
              <Text fw={500} fz="sm" mb={5}>
                {title}
              </Text>
              {description && (
                <Text c="dimmed" fz={11} lh={1.45}>
                  {description}
                </Text>
              )}
            </div>
          )}

          {withGrid ? (
            <SimpleGrid cols={{ base: 1, '480px': 2, '780px': 4 }} p={8}>
              {controls}
            </SimpleGrid>
          ) : (
            controls
          )}
        </div>
      </div>
    </div>
  );
}
