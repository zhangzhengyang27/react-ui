import { Button, ComboboxPopover } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, ComboboxPopover } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>在上方打开下拉</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Demo() {
  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          Open dropdown above
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const dropdownPosition: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
