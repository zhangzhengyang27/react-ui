import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { Rating } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Rating } from '@react-ui/ui';
import { SunIcon, MoonIcon } from '@phosphor-icons/react';

function Demo() {
  return <Rating emptySymbol={<SunIcon size={16} />} fullSymbol={<MoonIcon size={16} />} />;
}
`;

function Demo() {
  return <Rating emptySymbol={<SunIcon size={16} />} fullSymbol={<MoonIcon size={16} />} />;
}

export const symbol: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
