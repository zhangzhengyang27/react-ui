import { CheckIcon, XIcon } from '@phosphor-icons/react';
import { Notification } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { XIcon, CheckIcon } from '@phosphor-icons/react';
import { Notification } from '@react-ui/ui';

function Demo() {
  const xIcon = <XIcon size={20} />;
  const checkIcon = <CheckIcon size={20} />;

  return (
    <>
      <Notification icon={xIcon} color="red" title="糟糕！">
        Something went wrong
      </Notification>
      <Notification icon={checkIcon} color="teal" title="一切正常！" mt="md">
        Everything is fine
      </Notification>
    </>
  );
}
`;

function Demo() {
  const xIcon = <XIcon size={20} />;
  const checkIcon = <CheckIcon size={20} />;

  return (
    <>
      <Notification icon={xIcon} color="red" title="糟糕！">
        Something went wrong
      </Notification>
      <Notification icon={checkIcon} color="teal" title="一切正常！" mt="md">
        Everything is fine
      </Notification>
    </>
  );
}

export const icon: UIDemo = {
  type: 'code',
  component: Demo,
  dimmed: true,
  maxWidth: 400,
  centered: true,
  code,
};
