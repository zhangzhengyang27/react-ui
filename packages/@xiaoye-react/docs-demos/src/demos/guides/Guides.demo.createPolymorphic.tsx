import { Button, ButtonProps, Group, polymorphic } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { polymorphic, Button, ButtonProps, Group } from '@xiaoye-react/ui';

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
      <CustomButton label="默认按钮" color="cyan" />
      <CustomButtonAnchor label="默认锚点" href="#" target="_blank" />
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
      <CustomButton label="默认按钮" color="cyan" />
      <CustomButtonAnchor label="默认锚点" href="#" target="_blank" />
    </Group>
  );
}

export const createPolymorphic: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
