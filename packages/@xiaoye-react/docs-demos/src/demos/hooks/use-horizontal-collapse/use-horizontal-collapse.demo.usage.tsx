import { Button, Stack, Typography } from '@xiaoye-react/ui';
import { useDisclosure, useHorizontalCollapse } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Stack, Typography } from '@xiaoye-react/ui';
import { useDisclosure, useHorizontalCollapse } from '@xiaoye-react/hooks';

function Demo() {
  const [expanded, handlers] = useDisclosure(false);
  const { getCollapseProps } = useHorizontalCollapse({ expanded });

  return (
    <Stack h={240}>
      <Button onClick={handlers.toggle} w="fit-content">
        {expanded ? '收起' : '展开'}
      </Button>

      <div {...getCollapseProps({ style: { width: 200 } })}>
        <Typography bg="var(--ui-color-blue-light)" p="xs" bdrs="md" w={200}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </div>
    </Stack>
  );
}
`;

function Demo() {
  const [expanded, handlers] = useDisclosure(false);
  const { getCollapseProps } = useHorizontalCollapse({ expanded });

  return (
    <Stack h={240}>
      <Button onClick={handlers.toggle} w="fit-content">
        {expanded ? '收起' : '展开'}
      </Button>

      <div {...getCollapseProps({ style: { width: 200 } })}>
        <Typography bg="var(--ui-color-blue-light)" p="xs" bdrs="md" w={200}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </div>
    </Stack>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
