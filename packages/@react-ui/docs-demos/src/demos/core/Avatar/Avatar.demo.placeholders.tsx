import { StarIcon } from '@phosphor-icons/react';
import { Avatar, Group } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Avatar } from '@react-ui/ui';
import { StarIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      {/* Default placeholder */}
      <Avatar src={null} alt="无图片" />

      {/* Default placeholder with custom color */}
      <Avatar src={null} alt="无图片" color="indigo" />

      {/* Placeholder with initials */}
      <Avatar src={null} alt="周八" color="red">VR</Avatar>

      {/* Placeholder with custom icon */}
      <Avatar color="blue" radius="xl">
        <StarIcon size={20} />
      </Avatar>
    </>
  );
}

`;

function Demo() {
  return (
    <Group justify="center">
      <Avatar src={null} alt="无图片" />
      <Avatar src={null} alt="无图片" color="indigo" />
      <Avatar src={null} alt="无图片" color="red">
        VR
      </Avatar>
      <Avatar color="blue" radius="xl">
        <StarIcon size={20} />
      </Avatar>
    </Group>
  );
}

export const placeholders: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
