import { Button, TreeSelect } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './data';

const code = `
import { TreeSelect, Button } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { data } from './data';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <TreeSelect
        label="你最喜欢的项目"
        placeholder="选择值"
        data={data}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}
`;

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <TreeSelect
        label="你最喜欢的项目"
        placeholder="选择值"
        data={data}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}

export const dropdownOpened: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
};
