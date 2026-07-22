import { useState } from 'react';
import { Checkbox } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Checkbox.demo.customize.module.css';

const cssCode = `
.root {
  border: 1px solid light-dark(var(--ui-color-gray-3), var(--ui-color-dark-4));
  padding: var(--ui-spacing-xs) var(--ui-spacing-sm);
  border-radius: var(--ui-radius-md);
  font-weight: 600;
  transition:
    color 100ms ease,
    background-color 100ms ease,
    border-color 100ms ease;
  cursor: pointer;

  &[data-checked] {
    background-color: var(--ui-color-blue-filled);
    border-color: var(--ui-color-blue-filled);
    color: var(--ui-color-white);
  }

  & * {
    pointer-events: none;
    user-select: none;
  }
}
`;

const code = `
import { useState } from 'react';
import { Checkbox } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      classNames={classes}
      label="复选框按钮"
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      wrapperProps={{
        onClick: () => setChecked((c) => !c),
      }}
    />
  );
}
`;

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      classNames={classes}
      label="复选框按钮"
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      wrapperProps={{
        onClick: () => setChecked((c) => !c),
      }}
    />
  );
}

export const customize: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  defaultExpanded: false,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
