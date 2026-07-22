import { useState } from 'react';
import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<bigint | string>(BigInt('12345678901234567890'));

  return (
    <NumberInput
      label="BigInt 值"
      description="从 defaultValue/value 推断 BigInt 模式"
      value={value}
      onChange={setValue}
      step={BigInt(10)}
      min={BigInt(0)}
      thousandSeparator=","
      prefix="$"
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<bigint | string>(BigInt('12345678901234567890'));

  return (
    <NumberInput
      label="BigInt 值"
      description="从 defaultValue/value 推断 BigInt 模式"
      value={value}
      onChange={setValue}
      step={BigInt(10)}
      min={BigInt(0)}
      thousandSeparator=","
      prefix="$"
    />
  );
}

export const bigInt: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 420,
};
