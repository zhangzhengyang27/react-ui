import { Box } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { TimelineBase } from './_base'

const code = `
import { Timeline, Text } from '@xiaoye-react/ui';
import { GitBranchIcon } from '@phosphor-icons/react/dist/csr/GitBranch';
import { GitPullRequestIcon } from '@phosphor-icons/react/dist/csr/GitPullRequest';
import { GitCommitIcon } from '@phosphor-icons/react/dist/csr/GitCommit';
import { ChatCircleDotsIcon } from '@phosphor-icons/react/dist/csr/ChatCircleDots';
function Demo() {
  return (
    <Timeline active={1} bulletSize={24} lineWidth={2}>
      <Timeline.Item bullet={<GitBranchIcon size={12} />} title="新分支">
        <Text c="dimmed" size="sm">你创建了新的分支 <Text variant="link" component="span" inherit>修复通知</Text> 从 master 分支</Text>
        <Text size="xs" mt={4}>2 小时前</Text>
      </Timeline.Item>

      <Timeline.Item bullet={<GitCommitIcon size={12} />} title="提交">
        <Text c="dimmed" size="sm">你推送了 23 个提交到<Text variant="link" component="span" inherit>fix-notifications 分支</Text></Text>
        <Text size="xs" mt={4}>52 分钟前</Text>
      </Timeline.Item>

      <Timeline.Item title="拉取请求" bullet={<GitPullRequestIcon size={12} />} lineVariant="dashed">
        <Text c="dimmed" size="sm">你提交了拉取请求<Text variant="link" component="span" inherit>修复不正确的通知消息 (#187)</Text></Text>
        <Text size="xs" mt={4}>34 分钟前</Text>
      </Timeline.Item>

      <Timeline.Item title="代码审查" bullet={<ChatCircleDotsIcon size={12} />}>
        <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>罗伯特</Text> 在你的拉取请求上留下了代码审查</Text>
        <Text size="xs" mt={4}>12 分钟前</Text>
      </Timeline.Item>
    </Timeline>
  );
}
`

function Demo() {
    return (
        <Box maw={320} mx="auto">
            <TimelineBase />
        </Box>
    )
}

export const usage: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
