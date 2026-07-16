import { LockIcon } from '@phosphor-icons/react';
import { PasswordInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { PasswordInput } from '@react-ui/ui';
import { LockIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <LockIcon size={18} />;

  return (
    <>
      <PasswordInput
        leftSection={icon}
        leftSectionPointerEvents="none"
        label="带左侧区域"
        placeholder="带左侧区域"
      />
      <PasswordInput
        rightSection={icon}
        label="带右侧区域"
        placeholder="带右侧区域"
        rightSectionPointerEvents="none"
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  const icon = <LockIcon size={18} />;

  return (
    <>
      <PasswordInput
        leftSection={icon}
        leftSectionPointerEvents="none"
        label="带左侧区域"
        placeholder="带左侧区域"
      />
      <PasswordInput
        rightSection={icon}
        label="带右侧区域"
        placeholder="带右侧区域"
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
