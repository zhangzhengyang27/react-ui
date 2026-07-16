import { TreeSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { inputControls } from '../../../shared';
import { data } from './data';

const code = `
import { TreeSelect } from '@react-ui/ui';
import { data } from './data';


function Demo() {
  return (
    <TreeSelect
      {{props}}
      placeholder="选择值"
      data={data}
    />
  );
}
`;

function Wrapper(props: any) {
  return <TreeSelect {...props} placeholder="选择值" data={data} />;
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
