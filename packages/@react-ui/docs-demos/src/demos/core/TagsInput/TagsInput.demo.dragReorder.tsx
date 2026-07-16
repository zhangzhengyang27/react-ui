import { useState } from 'react';
import { TagsInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { TagsInput } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState(['first', 'second', 'third']);

  return (
    <TagsInput
      label="拖动胶囊重新排序"
      description="可以通过拖动标签丸来重新排序"
      placeholder="输入标签"
      value={value}
      onChange={setValue}
      withPillsReorder
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState(['first', 'second', 'third']);

  return (
    <TagsInput
      label="拖动胶囊重新排序"
      description="可以通过拖动标签丸来重新排序"
      placeholder="输入标签"
      value={value}
      onChange={setValue}
      withPillsReorder
    />
  );
}

export const dragReorder: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
