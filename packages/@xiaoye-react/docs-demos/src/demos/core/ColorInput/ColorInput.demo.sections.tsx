import { EyedropperIcon } from '@phosphor-icons/react';
import { ColorInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ColorInput } from '@xiaoye-react/ui';
import { EyedropperIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <EyedropperIcon size={18} />;

  return (
    <>
      <ColorInput
        label="自定义左侧区域"
        placeholder="替换色板"
        leftSection={icon}
        leftSectionPointerEvents="none"
        withEyeDropper={false}
      />
      <ColorInput
        label="自定义右侧区域"
        placeholder="替换取色器"
        rightSection={icon}
        rightSectionPointerEvents="none"
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  const icon = <EyedropperIcon size={18} />;

  return (
    <>
      <ColorInput
        label="自定义左侧区域"
        placeholder="替换色板"
        leftSection={icon}
        leftSectionPointerEvents="none"
        withEyeDropper={false}
      />
      <ColorInput
        label="自定义右侧区域"
        placeholder="替换取色器"
        rightSection={icon}
        rightSectionPointerEvents="none"
        mt="md"
      />
    </>
  );
}

export const sections: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
