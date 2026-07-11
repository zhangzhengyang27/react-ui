import { Button, ComboboxPopover } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button, ComboboxPopover } from '@react-ui/ui';

function Demo() {
  return (
    <ComboboxPopover
      data={[]}
      nothingFoundMessage="No options available"
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>Open dropdown</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Demo() {
  return (
    <ComboboxPopover data={[]} nothingFoundMessage="No options available">
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          Open dropdown
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const nothingFound: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
