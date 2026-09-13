import { BoxProps, Group, Tooltip } from '@xiaoye-react/ui'
import { ColorSchemeControl } from './ColorSchemeControl'
import { DirectionControl } from './DirectionControl'
import { DiscordControl } from './DiscordControl'
import { GithubControl } from './GithubControl'
import { SearchControl } from './SearchControl'
import { SupportControl } from './SupportControl'

interface HeaderControlsProps extends BoxProps {
    onSearch?: () => void
    githubLink?: string
    withDirectionToggle?: boolean
    withSearch?: boolean
    withGithub?: boolean
    withDiscord?: boolean
    discordLink: string
    withColorScheme?: boolean
    withSupport?: boolean
}

export function HeaderControls({
    onSearch,
    githubLink,
    withDirectionToggle = true,
    withSearch = true,
    withGithub = true,
    withDiscord = true,
    withColorScheme = true,
    withSupport = true,
    discordLink,
    ...others
}: HeaderControlsProps) {
    return (
        <Tooltip.Group openDelay={600} closeDelay={100}>
            <Group gap="xs" {...others}>
                {withSearch && <SearchControl onClick={onSearch} />}
                {withDiscord && <DiscordControl link={discordLink} />}
                {withSupport && <SupportControl />}
                {/* githubLink 可选且 withGithub 默认 true：未传链接时不渲染无 href 的死链接 */}
                {withGithub && githubLink && <GithubControl link={githubLink} />}
                {withDirectionToggle && <DirectionControl />}
                {withColorScheme && <ColorSchemeControl />}
            </Group>
        </Tooltip.Group>
    )
}
