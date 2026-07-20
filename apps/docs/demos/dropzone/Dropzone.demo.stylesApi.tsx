import { Text } from '@react-ui/ui';
import { Dropzone, IMAGE_MIME_TYPE } from '@react-ui/dropzone';
import { UIDemo } from '@react-ui/demo';
import classes from './Dropzone.demo.stylesApi.module.css';

const cssCode = `
.root {
  min-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: light-dark(var(--ui-color-gray-0), var(--ui-color-dark-6));

  &[data-accept] {
    color: var(--ui-color-white);
    background-color: var(--ui-color-blue-6);
  }

  &[data-reject] {
    color: var(--ui-color-white);
    background-color: var(--ui-color-red-6);
  }
}

`;

const code = `
import { Text } from '@react-ui/ui';
import { Dropzone, IMAGE_MIME_TYPE } from '@react-ui/dropzone';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Dropzone onDrop={() => {}} accept={IMAGE_MIME_TYPE} className={classes.root}>
      <Text ta="center">将图片拖到这里</Text>
    </Dropzone>
  );
}
`;

function Demo() {
  return (
    <Dropzone onDrop={() => {}} accept={IMAGE_MIME_TYPE} className={classes.root}>
      <Text ta="center">将图片拖到这里</Text>
    </Dropzone>
  );
}

export const stylesApi: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
