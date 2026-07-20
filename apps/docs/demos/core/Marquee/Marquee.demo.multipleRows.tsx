import { Marquee, Stack } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { UILogo } from '@react-ui/logo';

const code = `
import { Marquee, Stack } from '@react-ui/ui';
import { UILogo } from '@react-ui/logo';

function Demo() {
  return (
    <Stack>
      <Marquee>
        <UILogo height={20} type="full" color="blue" />
        <UILogo height={20} type="full" color="cyan" />
        <UILogo height={20} type="full" color="teal" />
        <UILogo height={20} type="full" color="green" />
      </Marquee>
      <Marquee reverse>
        <UILogo height={20} type="full" color="lime" />
        <UILogo height={20} type="full" color="yellow" />
        <UILogo height={20} type="full" color="orange" />
        <UILogo height={20} type="full" color="red" />
      </Marquee>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Marquee>
        <UILogo height={20} type="full" color="blue" />
        <UILogo height={20} type="full" color="cyan" />
        <UILogo height={20} type="full" color="teal" />
        <UILogo height={20} type="full" color="green" />
      </Marquee>
      <Marquee reverse>
        <UILogo height={20} type="full" color="lime" />
        <UILogo height={20} type="full" color="yellow" />
        <UILogo height={20} type="full" color="orange" />
        <UILogo height={20} type="full" color="red" />
      </Marquee>
    </Stack>
  );
}

export const multipleRows: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
};
