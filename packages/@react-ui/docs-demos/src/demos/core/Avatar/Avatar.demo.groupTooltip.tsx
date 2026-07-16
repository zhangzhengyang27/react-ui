import { Avatar, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { avatars } from './_mockdata';

const code = `
import { Avatar, Tooltip } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        <Tooltip label="张三" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip label="李四" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip label="王五" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip
          withArrow
          label={
            <>
              <div>赵六</div>
              <div>孙七</div>
            </>
          }
        >
          <Avatar radius="xl">+2</Avatar>
        </Tooltip>
      </Avatar.Group>
    </Tooltip.Group>
  );
}
`;

function Demo() {
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        <Tooltip label="张三" withArrow>
          <Avatar src={avatars[0]} radius="xl" />
        </Tooltip>
        <Tooltip label="李四" withArrow>
          <Avatar src={avatars[1]} radius="xl" />
        </Tooltip>
        <Tooltip label="王五" withArrow>
          <Avatar src={avatars[2]} radius="xl" />
        </Tooltip>
        <Tooltip
          withArrow
          label={
            <>
              <div>赵六</div>
              <div>孙七</div>
            </>
          }
        >
          <Avatar radius="xl">+2</Avatar>
        </Tooltip>
      </Avatar.Group>
    </Tooltip.Group>
  );
}

export const groupTooltip: UIDemo = {
  type: 'code',
  centered: true,
  code,
  component: Demo,
};
