import { useState } from 'react';
import { CheckIcon, XIcon } from '@phosphor-icons/react';
import { Switch } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Switch } from '@react-ui/ui';
import { CheckIcon, XIcon } from '@phosphor-icons/react';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      color="teal"
      size="md"
      label="带滑块图标的开关"
      thumbIcon={
        checked ? (
          <CheckIcon size={12} color="var(--ui-color-teal-6)" />
        ) : (
          <XIcon size={12} color="var(--ui-color-red-6)" />
        )
      }
    />
  );
}
`;

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      color="teal"
      size="md"
      label="带滑块图标的开关"
      thumbIcon={
        checked ? (
          <CheckIcon size={12} color="var(--ui-color-teal-6)" />
        ) : (
          <XIcon size={12} color="var(--ui-color-red-6)" />
        )
      }
    />
  );
}

export const thumbIcon: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
