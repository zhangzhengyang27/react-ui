import { UIDemo } from '@xiaoye-react/demo';
import { BaseDemo } from './_base';

const code = `
import { Dropzone } from '@xiaoye-react/ui';

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
