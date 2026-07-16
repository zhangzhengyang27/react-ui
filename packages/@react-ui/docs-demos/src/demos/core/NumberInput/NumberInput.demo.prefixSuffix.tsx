import { NumberInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <NumberInput
        label="带前缀"
        placeholder="美元"
        prefix="$"
        defaultValue={100}
        mb="md"
      />
      <NumberInput
        label="带后缀"
        placeholder="百分比"
        suffix="%"
        defaultValue={100}
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
        label="带前缀"
        placeholder="美元"
        prefix="$"
        defaultValue={100}
        mb="md"
      />
      <NumberInput
        label="带后缀"
        placeholder="百分比"
        suffix="%"
        defaultValue={100}
        mt="md"
      />
    </>
  );
}

export const prefixSuffix: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
