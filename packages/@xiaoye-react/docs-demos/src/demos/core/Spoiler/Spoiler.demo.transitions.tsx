import { UIDemo } from '@xiaoye-react/demo';
import { Wrapper } from './_wrapper';

const code = `
import { Spoiler } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Spoiler maxHeight={120} showLabel="显示更多" hideLabel="隐藏" transitionDuration={0}>
      {/* Content here */}
    </Spoiler>
  );
}
`;

function Demo() {
  return <Wrapper transitionDuration={0} />;
}

export const transitions: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
