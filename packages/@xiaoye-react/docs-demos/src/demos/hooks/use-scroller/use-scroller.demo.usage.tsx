import { Box, Button, Group } from '@xiaoye-react/ui';
import { useScroller } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Box, Button, Group } from '@xiaoye-react/ui';
import { useScroller } from '@xiaoye-react/hooks';

function Demo() {
  const scroller = useScroller();

  return (
    <Box>
      <Group mb="md">
        <Button
          onClick={scroller.scrollStart}
          disabled={!scroller.canScrollStart}
          variant="default"
          size="xs"
        >
          ← Scroll left
        </Button>
        <Button
          onClick={scroller.scrollEnd}
          disabled={!scroller.canScrollEnd}
          variant="default"
          size="xs"
        >
          Scroll right →
        </Button>
      </Group>

      <div
        ref={scroller.ref}
        {...scroller.dragHandlers}
        style={{
          overflow: 'auto',
          cursor: scroller.isDragging ? 'grabbing' : 'grab',
        }}
      >
        <Group wrap="nowrap" gap="md">
          {Array.from({ length: 20 }).map((_, index) => (
            <Box
              key={index}
              style={{
                minWidth: 100,
                height: 80,
                backgroundColor: 'var(--ui-color-blue-filled)',
                borderRadius: 'var(--ui-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {index + 1}
            </Box>
          ))}
        </Group>
      </div>
    </Box>
  );
}
`;

function Demo() {
  const scroller = useScroller();

  return (
    <Box>
      <Group mb="md">
        <Button
          onClick={scroller.scrollStart}
          disabled={!scroller.canScrollStart}
          variant="default"
          size="xs"
        >
          ← Scroll left
        </Button>
        <Button
          onClick={scroller.scrollEnd}
          disabled={!scroller.canScrollEnd}
          variant="default"
          size="xs"
        >
          Scroll right →
        </Button>
      </Group>

      <div
        ref={scroller.ref}
        {...scroller.dragHandlers}
        style={{
          overflow: 'auto',
          cursor: scroller.isDragging ? 'grabbing' : 'grab',
        }}
      >
        <Group wrap="nowrap" gap="md">
          {Array.from({ length: 20 }).map((_, index) => (
            <Box
              key={index}
              style={{
                minWidth: 100,
                height: 80,
                backgroundColor: 'var(--ui-color-blue-filled)',
                borderRadius: 'var(--ui-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {index + 1}
            </Box>
          ))}
        </Group>
      </div>
    </Box>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
