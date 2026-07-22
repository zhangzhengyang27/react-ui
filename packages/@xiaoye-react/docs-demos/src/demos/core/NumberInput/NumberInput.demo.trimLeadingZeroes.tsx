import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <NumberInput
        label="失去焦点时移除前导零"
        placeholder="输入 00100 然后点击外部"
        trimLeadingZeroesOnBlur
        defaultValue="00100"
      />

      <NumberInput
        label="保留前导零"
        placeholder="输入 00100 然后点击外部"
        trimLeadingZeroesOnBlur={false}
        defaultValue="00100"
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NumberInput
        label="失去焦点时移除前导零"
        placeholder="输入 00100 然后点击外部"
        trimLeadingZeroesOnBlur
        defaultValue="00100"
      />

      <NumberInput
        label="保留前导零"
        placeholder="输入 00100 然后点击外部"
        trimLeadingZeroesOnBlur={false}
        defaultValue="00100"
        mt="md"
      />
    </>
  );
}

export const trimLeadingZeroes: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
