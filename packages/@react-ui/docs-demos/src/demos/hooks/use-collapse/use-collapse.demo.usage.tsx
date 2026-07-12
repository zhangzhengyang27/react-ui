import { Button, Typography } from '@react-ui/ui';
import { useCollapse, useDisclosure } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button, Typography } from '@react-ui/ui';
import { useCollapse, useDisclosure } from '@react-ui/hooks';

function Demo() {
  const [expanded, handlers] = useDisclosure(false);
  const { getCollapseProps } = useCollapse({ expanded });

  return (
    <>
      <Button onClick={handlers.toggle} mb="md">
        {expanded ? 'Collapse' : 'Expand'}
      </Button>

      <div {...getCollapseProps()}>
        <Typography bg="var(--ui-color-blue-light)" p="xs" bdrs="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </div>
    </>
  );
}
`;

function Demo() {
  const [expanded, handlers] = useDisclosure(false);
  const { getCollapseProps } = useCollapse({ expanded });

  return (
    <>
      <Button onClick={handlers.toggle} mb="md">
        {expanded ? 'Collapse' : 'Expand'}
      </Button>

      <div {...getCollapseProps()}>
        <Typography bg="var(--ui-color-blue-light)" p="xs" bdrs="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </div>
    </>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
