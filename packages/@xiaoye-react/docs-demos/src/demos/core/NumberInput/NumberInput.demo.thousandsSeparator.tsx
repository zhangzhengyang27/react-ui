import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <NumberInput
        label="千位使用逗号分隔"
        placeholder="千位使用逗号分隔"
        thousandSeparator=","
        defaultValue={1_000_000}
      />

      <NumberInput
        label="千位使用空格分隔"
        placeholder="千位使用空格分隔"
        thousandSeparator=" "
        defaultValue={1_000_000}
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
        label="千位使用逗号分隔"
        placeholder="千位使用逗号分隔"
        thousandSeparator=","
        defaultValue={1_000_000}
      />

      <NumberInput
        label="千位使用空格分隔"
        placeholder="千位使用空格分隔"
        thousandSeparator=" "
        defaultValue={1_000_000}
        mt="md"
      />
    </>
  );
}

export const thousandsSeparator: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
