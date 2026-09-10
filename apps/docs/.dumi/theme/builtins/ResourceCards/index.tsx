import React from 'react'
import { AiOutlineExclamationCircle } from '../../icons'
import { Card, Grid, Text, Tooltip } from '@xiaoye-react/ui'

import useLocale from '../../../hooks/useLocale'
import classes from './index.module.css'

export type Resource = {
    title: string
    description: string
    cover: string
    src: string
    official?: boolean
}

const locales = {
    cn: {
        official: '官方',
        thirdPart: '非官方',
        thirdPartDesc: '非官方产品，请自行确认可用性'
    },
    en: {
        official: 'Official',
        thirdPart: 'Third Party',
        thirdPartDesc: 'Unofficial product, please take care confirm availability'
    }
}

export type ResourceCardProps = {
    resource: Resource
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
    const [locale] = useLocale(locales)

    const { title, description, cover, src, official } = resource

    const badge = official ? (
        <div className={classes.badge}>{locale.official}</div>
    ) : (
        <Tooltip label={locale.thirdPartDesc}>
            <div className={classes.badge}>
                <AiOutlineExclamationCircle />
                {locale.thirdPart}
            </div>
        </Tooltip>
    )

    return (
        <Grid.Col span={{ base: 12, xs: 6, md: 4, lg: 3 }}>
            <a className={classes.cardLink} target="_blank" href={src} rel="noopener noreferrer">
                <Card className={classes.card} padding={0} withBorder>
                    <div className={classes.cover}>
                        <img draggable={false} src={cover} alt={title} className={classes.coverImg} />
                    </div>
                    <div className={classes.body}>
                        <Text fw={600} className={classes.title}>
                            {title}
                        </Text>
                        <Text size="sm" c="dimmed" lineClamp={1} title={description}>
                            {description}
                        </Text>
                    </div>
                    {badge}
                </Card>
            </a>
        </Grid.Col>
    )
}

export type ResourceCardsProps = {
    resources: Resource[]
}

const ResourceCards: React.FC<ResourceCardsProps> = ({ resources }) => (
    <Grid gutter="lg">
        {resources.map(item => (
            <ResourceCard resource={item} key={item?.title} />
        ))}
    </Grid>
)

export default ResourceCards
