import { StarIcon } from '@phosphor-icons/react';
import { Avatar, Group } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { avatars } from './_mockdata';

const code = `
import { Avatar } from '@react-ui/ui';
import { StarIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      {/* With image */}
      <Avatar src="avatar.png" alt="it's me" />

      {/* Default placeholder */}
      <Avatar radius="xl" />

      {/* Letters with xl radius */}
      <Avatar color="cyan" radius="xl">MK</Avatar>

      {/* Custom placeholder icon */}
      <Avatar color="blue" radius="sm">
        <StarIcon size={20} />
      </Avatar>
    </>
  );
}

`;

function Demo() {
  return (
    <Group justify="center">
      <Avatar src={avatars[0]} alt="it's me" />
      <Avatar radius="xl" />
      <Avatar color="cyan" radius="xl">
        MK
      </Avatar>
      <Avatar color="blue" radius="sm">
        <StarIcon size={20} />
      </Avatar>
    </Group>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
