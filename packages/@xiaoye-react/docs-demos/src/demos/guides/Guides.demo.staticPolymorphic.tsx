import { Button, ButtonProps, ElementProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, ButtonProps, ElementProps } from '@xiaoye-react/ui';

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
