import { Button, ComboboxPopover } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, ComboboxPopover } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 250, position: 'bottom-start' }}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>选择框架</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Demo() {
  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 250, position: 'bottom-start' }}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          Select framework
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const dropdownWidth: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
