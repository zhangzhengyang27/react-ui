import { TreeSelect, TreeSelectMode, TreeSelectProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../shared';
import { data } from './data';

const code = `
import { TreeSelect } from '@xiaoye-react/ui';
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

function Wrapper(props: TreeSelectProps<TreeSelectMode>) {
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
