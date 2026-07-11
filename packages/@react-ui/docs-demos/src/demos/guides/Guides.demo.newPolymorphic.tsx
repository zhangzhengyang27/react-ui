import { Box, BoxProps, Group, polymorphic } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Box, BoxProps, polymorphic, Group } from '@react-ui/ui';

interface MyButtonProps extends BoxProps {
  label: string;
}

const MyButton = polymorphic<'button', MyButtonProps>(
  ({ label, ...others }: MyButtonProps) => (
    <Box component="button" {...others}>
      {label}
    </Box>
  )
);

function Demo() {
  return (
    <Group>
      <MyButton label="Button by default" />
      <MyButton
        label="MyButton as anchor"
        component="a"
        href="https://mantine.dev"
        target="_blank"
      />
    </Group>
  );
}
`;

interface MyButtonProps extends BoxProps {
  label: string;
}

const MyButton = polymorphic<'button', MyButtonProps>(({ label, ...others }: MyButtonProps) => (
  <Box component="button" {...others}>
    {label}
  </Box>
));

function Demo() {
  return (
    <Group>
      <MyButton label="Button by default" />
      <MyButton
        label="MyButton as anchor"
        component="a"
        href="https://mantine.dev"
        target="_blank"
      />
    </Group>
  );
}

export const newPolymorphic: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
