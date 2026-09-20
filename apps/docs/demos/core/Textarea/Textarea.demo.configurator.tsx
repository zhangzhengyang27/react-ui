import { Textarea, TextareaProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../shared';

const code = `
import { Textarea } from '@xiaoye-react/ui';


function Demo() {
  return (
    <Textarea
      {{props}}
      placeholder="输入占位符"
    />
  );
}
`;

function Wrapper(props: TextareaProps) {
  return <Textarea {...props} placeholder="输入占位符" />;
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
