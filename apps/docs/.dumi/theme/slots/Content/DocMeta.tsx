import React, { useLayoutEffect, useMemo, useState } from 'react'
import { AiOutlineCalendar } from '../../icons'
import { Avatar, Flex, Skeleton, Text } from '@xiaoye-react/ui'
import dayjs from 'dayjs'
import { useSharedRouteMeta } from '../../common/RouteMetaContext'

interface AuthorAvatarPoprs {
    name: string
    avatar: string
}

const AuthorAvatar: React.FC<AuthorAvatarPoprs> = ({ name, avatar }) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useLayoutEffect(() => {
        const img = new Image()
        img.src = avatar
        img.onload = () => setLoading(false)
        img.onerror = () => setError(true)
    }, [avatar])
    if (error) {
        return null
    }
    if (loading) {
        return <Skeleton circle height={24} />
    }
    return (
        <Avatar src={avatar} alt={name} size={24}>
            {name}
        </Avatar>
    )
}

const DocMeta: React.FC = () => {
    // 共享 RouteMeta（切页卡顿治理 · 修复 4）
    const meta = useSharedRouteMeta()

    const { author } = meta.frontmatter

    const mergedAuthorInfos = useMemo(() => {
        if (!author) {
            return []
        }
        if (typeof author === 'string') {
            return author.split(',').map(item => ({
                name: item,
                avatar: `https://github.com/${item}.png`
            }))
        }
        if (Array.isArray(author)) {
            return author
        }
        return []
    }, [author])

    if (!meta.frontmatter.date && !meta.frontmatter.author) {
        return null
    }

    return (
        <Text component="div">
            <Flex gap="sm" align="center">
                {meta.frontmatter.date && (
                    <span style={{ opacity: 0.65 }}>
                        <AiOutlineCalendar /> {dayjs(meta.frontmatter.date).format('YYYY-MM-DD')}
                    </span>
                )}
                {mergedAuthorInfos.map<React.ReactNode>(info => (
                    <a
                        href={`https://github.com/${info.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={info.name}
                    >
                        <Flex gap={4} align="center">
                            <AuthorAvatar name={info.name} avatar={info.avatar} />
                            <span style={{ opacity: 0.65 }}>@{info.name}</span>
                        </Flex>
                    </a>
                ))}
            </Flex>
        </Text>
    )
}

export default DocMeta
