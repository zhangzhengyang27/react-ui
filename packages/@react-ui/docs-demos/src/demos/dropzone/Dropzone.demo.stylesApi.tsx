import { Text } from '@react-ui/ui';
import { Dropzone, IMAGE_MIME_TYPE } from '@react-ui/dropzone';
import { MantineDemo } from '@react-ui/demo';
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
      <Text ta="center">Drop images here</Text>
    </Dropzone>
  );
}
`;

function Demo() {
  return (
    <Dropzone onDrop={() => {}} accept={IMAGE_MIME_TYPE} className={classes.root}>
      <Text ta="center">Drop images here</Text>
    </Dropzone>
  );
}

export const stylesApi: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
};
