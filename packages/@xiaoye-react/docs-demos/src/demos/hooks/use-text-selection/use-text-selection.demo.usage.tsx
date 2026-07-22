import { useTextSelection } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useTextSelection } from '@xiaoye-react/hooks';

function Demo() {
  const selection = useTextSelection();
  return (
    <>
      <div>在此页面任意位置选择一些文本，它将显示在下方</div>
      <div>Selected text: {selection?.toString()}</div>
    </>
  );
}
`;

function Demo() {
  const selection = useTextSelection();
  return (
    <>
      <div>在此页面任意位置选择一些文本，它将显示在下方</div>
      <div>
        Selected text: <b>{selection?.toString()}</b>
      </div>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
