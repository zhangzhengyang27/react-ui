import { Button, ComboboxPopover } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, ComboboxPopover } from '@react-ui/ui';

const data = Array(50)
  .fill(0)
  .map((_, index) => \`Option \${index}\`);

function Demo() {
  return (
    <ComboboxPopover data={data} maxDropdownHeight={200}>
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>选择选项</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

const data = Array(50)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <ComboboxPopover data={data} maxDropdownHeight={200}>
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          Select option
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const scrollArea: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
