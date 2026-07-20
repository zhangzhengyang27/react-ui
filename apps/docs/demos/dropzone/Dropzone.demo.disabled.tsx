import { UIDemo } from '@react-ui/demo';
import { BaseDemo } from './_base';
import classes from './Dropzone.disabled.module.css';

const cssCode = `
.disabled {
  background-color: light-dark(var(--ui-color-gray-0), var(--ui-color-dark-6));
  border-color: light-dark(var(--ui-color-gray-2), var(--ui-color-dark-5));
  cursor: not-allowed;

  & * {
    color: light-dark(var(--ui-color-gray-5), var(--ui-color-dark-3));
  }
}
`;

const code = `
import { Dropzone } from '@react-ui/dropzone';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Dropzone disabled className={classes.disabled} onDrop={() => {}}>
      {/* children... */}
    </Dropzone>
  );
}
`;

function Demo() {
  return <BaseDemo disabled className={classes.disabled} />;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
