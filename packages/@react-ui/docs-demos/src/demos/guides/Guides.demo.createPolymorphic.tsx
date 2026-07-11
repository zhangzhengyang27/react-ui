import { Button, ButtonProps, Group, polymorphic } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { polymorphic, Button, ButtonProps, Group } from '@react-ui/ui';

interface CustomButtonProps extends ButtonProps {
  label: string;
}

// Default root element is 'button', but it can be changed with 'component' prop
const CustomButton = polymorphic<'button', CustomButtonProps>(
  ({ label, ...others }: CustomButtonProps) => <Button {...others}>{label}</Button>
);

// Default root element is 'a', but it can be changed with 'component' prop
const CustomButtonAnchor = polymorphic<'a', CustomButtonProps>(
  ({ label, ...others }: CustomButtonProps) => (
    <Button component="a" {...others}>
      {label}
    </Button>
  )
);

function Demo() {
  return (
    <Group>
      <CustomButton label="Button by default" color="cyan" />
      <CustomButtonAnchor label="Anchor by default" href="https://mantine.dev" target="_blank" />
    </Group>
  );
}
`;

interface CustomButtonProps extends ButtonProps {
  label: string;
}

const CustomButton = polymorphic<'button', CustomButtonProps>(
  ({ label, ...others }: CustomButtonProps) => <Button {...others}>{label}</Button>
);

const CustomButtonAnchor = polymorphic<'a', CustomButtonProps>(
  ({ label, ...others }: CustomButtonProps) => (
    <Button component="a" {...others}>
      {label}
    </Button>
  )
);

function Demo() {
  return (
    <Group>
      <CustomButton label="Button by default" color="cyan" />
      <CustomButtonAnchor label="Anchor by default" href="https://mantine.dev" target="_blank" />
    </Group>
  );
}

export const createPolymorphic: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
