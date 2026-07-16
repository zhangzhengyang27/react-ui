import { Input, TextInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './Input.demo.focusStyles.module.css';

const code = `
import { Input, TextInput } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  return (
    <>
      <Input placeholder="常规 Input 组件" classNames={classes} />
      <TextInput
        placeholder="文本输入组件"
        label="TextInput 组件"
        mt="md"
        classNames={classes}
      />
    </>
  );
}
`;

const cssCode = `
.input {
  transition: none;

  &:focus-within {
    outline: 2px solid var(--ui-color-blue-filled);
    border-color: transparent;
  }
}
`;

function Demo() {
  return (
    <>
      <Input placeholder="常规 Input 组件" classNames={classes} />
      <TextInput
        placeholder="文本输入组件"
        label="TextInput 组件"
        mt="md"
        classNames={classes}
      />
    </>
  );
}

export const focusStyles: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code: [
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
    { fileName: '演示代码.tsx', code, language: 'tsx' },
  ],
};
