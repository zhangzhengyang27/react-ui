import { Marquee } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { MantineLogo } from '@react-ui/mantine-logo';

const code = `
import { Marquee } from '@react-ui/ui';
import { MantineLogo } from '@react-ui/mantine-logo';

function Demo() {
  return (
    <Marquee orientation="vertical" h={300}>
      <MantineLogo height={40} type="full" color="blue" />
      <MantineLogo height={40} type="full" color="cyan" />
      <MantineLogo height={40} type="full" color="teal" />
      <MantineLogo height={40} type="full" color="green" />
      <MantineLogo height={40} type="full" color="lime" />
      <MantineLogo height={40} type="full" color="yellow" />
      <MantineLogo height={40} type="full" color="orange" />
      <MantineLogo height={40} type="full" color="red" />
    </Marquee>
  );
}
`;

function Demo() {
  return (
    <Marquee orientation="vertical" h={300}>
      <MantineLogo height={40} type="full" color="blue" />
      <MantineLogo height={40} type="full" color="cyan" />
      <MantineLogo height={40} type="full" color="teal" />
      <MantineLogo height={40} type="full" color="green" />
      <MantineLogo height={40} type="full" color="lime" />
      <MantineLogo height={40} type="full" color="yellow" />
      <MantineLogo height={40} type="full" color="orange" />
      <MantineLogo height={40} type="full" color="red" />
    </Marquee>
  );
}

export const vertical: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
