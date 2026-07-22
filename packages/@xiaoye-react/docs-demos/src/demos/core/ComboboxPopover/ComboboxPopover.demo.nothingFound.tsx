import { Button, ComboboxPopover } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, ComboboxPopover } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ComboboxPopover
      data={[]}
      nothingFoundMessage="没有可用选项"
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>打开下拉</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Demo() {
  return (
    <ComboboxPopover data={[]} nothingFoundMessage="没有可用选项">
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          Open dropdown
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const nothingFound: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
