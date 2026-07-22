import { Button, ComboboxPopover } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, ComboboxPopover } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>带动画</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Demo() {
  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          With animation
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const dropdownAnimation: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
