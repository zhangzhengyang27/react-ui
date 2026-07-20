import { FileTextIcon } from '@phosphor-icons/react';
import { FileInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { FileInput } from '@react-ui/ui';
import { FileTextIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <FileTextIcon size={18} />;

  return (
    <>
      <FileInput
        leftSection={icon}
        label="上传你的简历"
        placeholder="你的简历"
        leftSectionPointerEvents="none"
      />
      <FileInput
        rightSection={icon}
        label="上传你的简历"
        placeholder="你的简历"
        rightSectionPointerEvents="none"
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  const icon = <FileTextIcon size={18} />;

  return (
    <>
      <FileInput
        leftSection={icon}
        label="上传你的简历"
        placeholder="你的简历"
        leftSectionPointerEvents="none"
      />
      <FileInput
        rightSection={icon}
        label="上传你的简历"
        placeholder="你的简历"
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
