import { Marquee, Stack } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { UILogo } from '@xiaoye-react/logo';

const code = `
import { Marquee, Stack } from '@xiaoye-react/ui';
import { UILogo } from '@xiaoye-react/logo';

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
