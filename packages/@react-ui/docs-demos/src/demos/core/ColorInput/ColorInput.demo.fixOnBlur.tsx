import { ColorInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ColorInput } from '@react-ui/ui';

function Demo() {
  return <ColorInput fixOnBlur={false} label="失焦时不固定值" placeholder="可能包含无效值" />;
}
`;

function Demo() {
  return (
    <ColorInput
      fixOnBlur={false}
      label="失焦时不固定值"
      placeholder="可能包含无效值"
    />
  );
}

export const fixOnBlur: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
