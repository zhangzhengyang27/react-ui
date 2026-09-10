import React from 'react'
import { FiFileText } from '../../icons'
import { ActionIcon, Code, Group, Text } from '@xiaoye-react/ui'
import { GithubIcon } from '@xiaoye-react/dev-icons'
import { allVersions } from '@xiaoye-react/meta'

import classes from './index.module.css'

function getMinorXVersion(version: string) {
    return `${version.split('.').slice(0, 2).join('.')}.X`
}

const VersionsList: React.FC = () => {
    const minorVersions = allVersions.map(minorVersion => {
        const patches = minorVersion.patches
            .filter(patch => !patch.version.endsWith('.0'))
            .map(patch => (
                <li key={patch.version}>
                    <a
                        href={`https://github.com/react-ui-org/react-ui/releases/tag/${patch.version}`}
                        target="_blank"
                        className={classes.patchLink}
                        rel="noreferrer"
                    >
                        <Code className={classes.patchBadge}>{patch.version}</Code> –{' '}
                        <span className={classes.patchLinkLabel}>{patch.date}</span>
                    </a>
                </li>
            ))

        return (
            <div key={minorVersion.version} className={classes.minorVersion}>
                <Group className={classes.versionHeader}>
                    <a
                        href={minorVersion.version !== '1.0.0' ? minorVersion.link : minorVersion.github}
                        className={classes.minorVersionBadgeWrapper}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Code className={classes.minorVersionBadge}>{minorVersion.version}</Code>
                    </a>

                    <Group gap={5}>
                        {minorVersion.version !== '1.0.0' && (
                            <ActionIcon
                                variant="default"
                                component="a"
                                href={minorVersion.link}
                                radius="md"
                                size={30}
                                target="_blank"
                                title="更新日志"
                                aria-label="更新日志"
                            >
                                <FiFileText size={14} />
                            </ActionIcon>
                        )}
                        <ActionIcon
                            component="a"
                            variant="default"
                            href={minorVersion.github}
                            target="_blank"
                            radius="md"
                            size={30}
                            className={classes.githubControl}
                            title="在 GitHub 上查看"
                            aria-label="在 GitHub 上查看"
                        >
                            <GithubIcon size={12} />
                        </ActionIcon>
                    </Group>

                    <Text className={classes.minorVersionDate}>{minorVersion.date}</Text>
                </Group>
                {patches.length > 0 ? (
                    <>
                        <Text mt="1.5rem" fz={15}>
                            <b>{getMinorXVersion(minorVersion.version)}</b> 补丁：
                        </Text>
                        <ul>{patches}</ul>
                    </>
                ) : (
                    <Text mt="1rem" fz={15}>
                        版本 {minorVersion.version} 暂无相关补丁发布。
                    </Text>
                )}
            </div>
        )
    })

    return <div className={classes.root}>{minorVersions}</div>
}

export default VersionsList
