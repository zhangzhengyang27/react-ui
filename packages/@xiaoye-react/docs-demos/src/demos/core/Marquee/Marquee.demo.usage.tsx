import { Marquee } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { UILogo } from '@xiaoye-react/logo';

const code = `
import { Marquee } from '@xiaoye-react/ui';
import { UILogo } from '@xiaoye-react/logo';

function Demo() {
  return (
    <Marquee gap="lg">
      <UILogo size={80} type="full" color="blue" />
      <UILogo size={80} type="full" color="cyan" />
      <UILogo size={80} type="full" color="teal" />
      <UILogo size={80} type="full" color="green" />
      <UILogo size={80} type="full" color="lime" />
      <UILogo size={80} type="full" color="yellow" />
      <UILogo size={80} type="full" color="orange" />
      <UILogo size={80} type="full" color="red" />
    </Marquee>
  );
}
`;

function Demo() {
  return (
    <Marquee gap="lg">
      <UILogo size={80} type="full" color="blue" />
      <UILogo size={80} type="full" color="cyan" />
      <UILogo size={80} type="full" color="teal" />
      <UILogo size={80} type="full" color="green" />
      <UILogo size={80} type="full" color="lime" />
      <UILogo size={80} type="full" color="yellow" />
      <UILogo size={80} type="full" color="orange" />
      <UILogo size={80} type="full" color="red" />
    </Marquee>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
};
