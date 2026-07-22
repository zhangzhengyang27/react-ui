import { useRef } from 'react';
import { Box, Paper, Text } from '@xiaoye-react/ui';
import { useIntersection } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useRef } from 'react';
import { useIntersection } from '@xiaoye-react/hooks';
import { Text, Paper, Box } from '@xiaoye-react/ui';

function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  return (
    <Paper ref={containerRef} h={300} style={{ overflowY: 'scroll' }}>
      <Box pt={260} pb={280}>
        <Paper
          ref={ref}
          p="xl"
          style={{
            backgroundColor: entry?.isIntersecting
              ? 'var(--ui-color-teal-7)'
              : 'var(--ui-color-red-7)',
            minWidth: '50%',
          }}
        >
          <Text c="#fff" fw={700}>
            {entry?.isIntersecting ? '完全可见' : '被遮挡'}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}
`;

function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  return (
    <Paper ref={containerRef} h={300} style={{ overflowY: 'scroll' }}>
      <Box pt={260} pb={280}>
        <Paper
          ref={ref}
          p="xl"
          style={{
            backgroundColor: entry?.isIntersecting
              ? 'var(--ui-color-teal-7)'
              : 'var(--ui-color-red-7)',
            minWidth: '50%',
          }}
        >
          <Text c="#fff" fw={700}>
            {entry?.isIntersecting ? '完全可见' : '被遮挡'}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
