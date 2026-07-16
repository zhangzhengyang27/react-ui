import { Button, ButtonProps, ElementProps } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, ButtonProps, ElementProps } from '@react-ui/ui';

const LinkButton = (props: ButtonProps & ElementProps<'a', keyof ButtonProps>) => (
  <Button {...props} component="a" />
);

function Demo() {
  return (
    <LinkButton href="#" target="_blank">
      ReactUI website
    </LinkButton>
  );
}
`;

const LinkButton = (props: ButtonProps & ElementProps<'a', keyof ButtonProps>) => (
  <Button {...props} component="a" />
);

function Demo() {
  return (
    <LinkButton href="#" target="_blank">
      ReactUI website
    </LinkButton>
  );
}

export const staticPolymorphic: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
