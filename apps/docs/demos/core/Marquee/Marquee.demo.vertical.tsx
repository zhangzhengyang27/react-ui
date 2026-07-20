import { Marquee } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { UILogo } from '@react-ui/logo';

const code = `
import { Marquee } from '@react-ui/ui';
import { UILogo } from '@react-ui/logo';

function Demo() {
  return (
    <Marquee orientation="vertical" h={300}>
      <UILogo height={40} type="full" color="blue" />
      <UILogo height={40} type="full" color="cyan" />
      <UILogo height={40} type="full" color="teal" />
      <UILogo height={40} type="full" color="green" />
      <UILogo height={40} type="full" color="lime" />
      <UILogo height={40} type="full" color="yellow" />
      <UILogo height={40} type="full" color="orange" />
      <UILogo height={40} type="full" color="red" />
    </Marquee>
  );
}
`;

function Demo() {
  return (
    <Marquee orientation="vertical" h={300}>
      <UILogo height={40} type="full" color="blue" />
      <UILogo height={40} type="full" color="cyan" />
      <UILogo height={40} type="full" color="teal" />
      <UILogo height={40} type="full" color="green" />
      <UILogo height={40} type="full" color="lime" />
      <UILogo height={40} type="full" color="yellow" />
      <UILogo height={40} type="full" color="orange" />
      <UILogo height={40} type="full" color="red" />
    </Marquee>
  );
}

export const vertical: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
