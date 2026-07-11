import { useTextSelection } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useTextSelection } from '@react-ui/hooks';

function Demo() {
  const selection = useTextSelection();
  return (
    <>
      <div>Select some text here or anywhere on the page and it will be displayed below</div>
      <div>Selected text: {selection?.toString()}</div>
    </>
  );
}
`;

function Demo() {
  const selection = useTextSelection();
  return (
    <>
      <div>Select some text here or anywhere on the page and it will be displayed below</div>
      <div>
        Selected text: <b>{selection?.toString()}</b>
      </div>
    </>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
