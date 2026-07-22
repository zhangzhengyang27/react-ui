import { SquaresFourIcon } from '@phosphor-icons/react';
import { TreeSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './data';

const code = `
import { TreeSelect } from '@xiaoye-react/ui';
import { SquaresFourIcon } from '@phosphor-icons/react';
import { data } from './data';

function Demo() {
  const icon = <SquaresFourIcon size={16} />;
  return (
    <>
      <TreeSelect
        data={data}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="你最喜欢的项目"
        placeholder="你最喜欢的项目"
      />
      <TreeSelect
        mt="md"
        data={data}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="你最喜欢的项目"
        placeholder="你最喜欢的项目"
      />
    </>
  );
}
`;

function Demo() {
  const icon = <SquaresFourIcon size={16} />;
  return (
    <>
      <TreeSelect
        data={data}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="你最喜欢的项目"
        placeholder="你最喜欢的项目"
      />
      <TreeSelect
        mt="md"
        data={data}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="你最喜欢的项目"
        placeholder="你最喜欢的项目"
      />
    </>
  );
}

export const sections: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
};
