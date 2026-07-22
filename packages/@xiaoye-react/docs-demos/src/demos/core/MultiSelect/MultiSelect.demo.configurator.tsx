import { MultiSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../../shared';

const code = `
import { MultiSelect } from '@xiaoye-react/ui';


function Demo() {
  return (
    <MultiSelect
      {{props}}
      placeholder="多选占位符"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
`;

function Wrapper(props: any) {
  return (
    <MultiSelect
      {...props}
      placeholder="多选占位符"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
