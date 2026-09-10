import { SunIcon } from '@phosphor-icons/react/dist/csr/Sun'
import { VideoCameraIcon } from '@phosphor-icons/react/dist/csr/VideoCamera'
import { Avatar, Text, ThemeIcon, Timeline } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ThemeIcon, Text, Avatar, Timeline } from '@xiaoye-react/ui';
import { SunIcon } from '@phosphor-icons/react/dist/csr/Sun';
import { VideoCameraIcon } from '@phosphor-icons/react/dist/csr/VideoCamera';
function Demo() {
  return (
    <Timeline bulletSize={24}>
      <Timeline.Item title="默认标记">
        <Text c="dimmed" size="sm">
          Default bullet without anything
        </Text>
      </Timeline.Item>
      <Timeline.Item
        title="头像"
        bullet={
          <Avatar
            size={22}
            radius="xl"
            src="https://avatars0.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
          />
        }
      >
        <Text c="dimmed" size="sm">
          Timeline bullet as avatar image
        </Text>
      </Timeline.Item>
      <Timeline.Item title="图标" bullet={<SunIcon size={13} />}>
        <Text c="dimmed" size="sm">
          Timeline bullet as icon
        </Text>
      </Timeline.Item>
      <Timeline.Item
        title="主题图标"
        bullet={
          <ThemeIcon
            size={22}
            variant="gradient"
            gradient={{ from: 'lime', to: 'cyan' }}
            radius="xl"
          >
            <VideoCameraIcon size={13} />
          </ThemeIcon>
        }
      >
        <Text c="dimmed" size="sm">
          Timeline bullet as ThemeIcon component
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}
`

function Demo() {
    return (
        <Timeline bulletSize={24}>
            <Timeline.Item title="默认标记">
                <Text c="dimmed" size="sm">
                    Default bullet without anything
                </Text>
            </Timeline.Item>
            <Timeline.Item
                title="头像"
                bullet={
                    <Avatar
                        size={22}
                        radius="xl"
                        src="https://avatars0.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
                    />
                }
            >
                <Text c="dimmed" size="sm">
                    Timeline bullet as avatar image
                </Text>
            </Timeline.Item>
            <Timeline.Item title="图标" bullet={<SunIcon size={13} />}>
                <Text c="dimmed" size="sm">
                    Timeline bullet as icon
                </Text>
            </Timeline.Item>
            <Timeline.Item
                title="主题图标"
                bullet={
                    <ThemeIcon size={22} variant="gradient" gradient={{ from: 'lime', to: 'cyan' }} radius="xl">
                        <VideoCameraIcon size={13} />
                    </ThemeIcon>
                }
            >
                <Text c="dimmed" size="sm">
                    Timeline bullet as ThemeIcon component
                </Text>
            </Timeline.Item>
        </Timeline>
    )
}

export const bullet: UIDemo = {
    type: 'code',
    centered: true,
    maxWidth: 320,
    component: Demo,
    code
}
