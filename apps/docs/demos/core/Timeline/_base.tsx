import { ChatCircleDotsIcon } from '@phosphor-icons/react/dist/csr/ChatCircleDots'
import { GitBranchIcon } from '@phosphor-icons/react/dist/csr/GitBranch'
import { GitCommitIcon } from '@phosphor-icons/react/dist/csr/GitCommit'
import { GitPullRequestIcon } from '@phosphor-icons/react/dist/csr/GitPullRequest'
import { Text, Timeline, TimelineProps } from '@xiaoye-react/ui'

export function TimelineBase({ noIcon, ...props }: Partial<TimelineProps> & { noIcon?: boolean }) {
    const displayIcon = !noIcon
    return (
        <Timeline active={1} bulletSize={24} lineWidth={2} {...props}>
            <Timeline.Item bullet={displayIcon ? <GitBranchIcon size={13} /> : null} title="新分支">
                <Text c="dimmed" size="sm">
                    你创建了新的分支{' '}
                    <Text variant="link" component="span" inherit>
                        fix-notifications
                    </Text>{' '}
                    从 master 分支
                </Text>
                <Text size="xs" mt={4}>
                    2 小时前
                </Text>
            </Timeline.Item>

            <Timeline.Item bullet={displayIcon ? <GitCommitIcon size={13} /> : null} title="提交">
                <Text c="dimmed" size="sm">
                    你推送了 23 个提交到{' '}
                    <Text variant="link" component="span" inherit>
                        fix-notifications
                    </Text>{' '}
                    branch
                </Text>
                <Text size="xs" mt={4}>
                    52 分钟前
                </Text>
            </Timeline.Item>

            <Timeline.Item
                title="拉取请求"
                bullet={displayIcon ? <GitPullRequestIcon size={13} /> : null}
                lineVariant="dashed"
            >
                <Text c="dimmed" size="sm">
                    你提交了拉取请求{' '}
                    <Text variant="link" component="span" inherit>
                        修复不正确的通知消息 (#187)
                    </Text>{' '}
                </Text>
                <Text size="xs" mt={4}>
                    34 分钟前
                </Text>
            </Timeline.Item>

            <Timeline.Item title="代码审查" bullet={displayIcon ? <ChatCircleDotsIcon size={13} /> : null}>
                <Text c="dimmed" size="sm">
                    <Text variant="link" component="span" inherit>
                        罗伯特
                    </Text>{' '}
                    在你的拉取请求上留下了代码审查
                </Text>
                <Text size="xs" mt={4}>
                    12 分钟前
                </Text>
            </Timeline.Item>
        </Timeline>
    )
}
