import { useState } from 'react';
import { MultiSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { MultiSelect } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState(['React', 'Angular', 'Vue']);

  return (
    <MultiSelect
      label="拖动胶囊重新排序"
      description="可以通过拖动胶囊重新排序已选值"
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte', 'Solid', 'Ember']}
      value={value}
      onChange={setValue}
      withPillsReorder
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState(['React', 'Angular', 'Vue']);

  return (
    <MultiSelect
      label="拖动胶囊重新排序"
      description="可以通过拖动胶囊重新排序已选值"
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte', 'Solid', 'Ember']}
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
