import { UIDemo } from '@react-ui/demo';
import { BaseDemo } from './_base';

const code = `
import { Dropzone } from '@react-ui/dropzone';

function Demo() {
  return (
    <Dropzone loading onDrop={() => {}}>
      {/* children */}
    </Dropzone>
  );
}
`;

function Demo() {
  return <BaseDemo loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
