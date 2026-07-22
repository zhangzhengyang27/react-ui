import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react';
import { Switch } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Switch } from '@xiaoye-react/ui';
import { SunIcon, MoonStarsIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={<SunIcon size={16} color="var(--ui-color-yellow-4)" />}
      offLabel={<MoonStarsIcon size={16} color="var(--ui-color-blue-6)" />}
    />
  );
}
`;

function Demo() {
  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={<SunIcon size={16} color="var(--ui-color-yellow-4)" />}
      offLabel={<MoonStarsIcon size={16} color="var(--ui-color-blue-6)" />}
    />
  );
}

export const iconLabels: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
