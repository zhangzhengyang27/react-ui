import React from 'react'
import {
    AiOutlineAppstore,
    AiOutlineBranches,
    AiOutlineCalendar,
    AiOutlineFileText,
    AiOutlineForm,
    AiOutlineThunderbolt,
    AiOutlineTool
} from '../../../theme/icons'
import { Card, Text, Title } from '@xiaoye-react/ui'

import useLocale from '../../../hooks/useLocale'
import Group from './Group'

import classes from './FeaturesSection.module.css'

const locales = {
    cn: {
        title: '为什么选择 react-ui',
        desc: '从基础组件到专业业务模块，一站式覆盖中后台与 C 端场景。',
        features: [
            {
                icon: <AiOutlineAppstore />,
                title: '120+ 组件',
                desc: 'Button、Modal、Form、Table 等原子与复合组件，开箱即用。'
            },
            {
                icon: <AiOutlineThunderbolt />,
                title: '83+ Hooks',
                desc: 'use-form、use-list-state、use-disclosure 等状态与 DOM 工具 hook。'
            },
            {
                icon: <AiOutlineCalendar />,
                title: 'Dates 日期',
                desc: 'DatePicker、Calendar、TimeInput 等完整日期时间解决方案。'
            },
            {
                icon: <AiOutlineFileText />,
                title: 'Schedule 日程',
                desc: 'DayView、AgendaView 等日程视图组件，支持拖拽与多时区。'
            },
            {
                icon: <AiOutlineForm />,
                title: 'Form 表单',
                desc: 'Schema 校验、嵌套表单、受控/非受控，配合 Field 组件快速搭建。'
            },
            {
                icon: <AiOutlineBranches />,
                title: '主题系统',
                desc: 'CSS 变量驱动，支持 light / dark / compact，可结合 AI 生成主题。'
            },
            {
                icon: <AiOutlineTool />,
                title: 'TypeScript 优先',
                desc: '完整类型推导， factory 模式组件 API，styles api 精确控制样式。'
            }
        ]
    },
    en: {
        title: 'Why react-ui',
        desc: 'From basic components to professional business modules, covering admin and consumer scenarios.',
        features: [
            {
                icon: <AiOutlineAppstore />,
                title: '120+ Components',
                desc: 'Button, Modal, Form, Table, and more, ready to use.'
            },
            {
                icon: <AiOutlineThunderbolt />,
                title: '83+ Hooks',
                desc: 'use-form, use-list-state, use-disclosure and more utilities.'
            },
            {
                icon: <AiOutlineCalendar />,
                title: 'Dates',
                desc: 'DatePicker, Calendar, TimeInput and full date-time solutions.'
            },
            {
                icon: <AiOutlineFileText />,
                title: 'Schedule',
                desc: 'DayView, AgendaView with drag-drop and multi-timezone support.'
            },
            {
                icon: <AiOutlineForm />,
                title: 'Form',
                desc: 'Schema validation, nested forms, controlled and uncontrolled patterns.'
            },
            {
                icon: <AiOutlineBranches />,
                title: 'Theming',
                desc: 'CSS variables driven, light / dark / compact, AI theme generation ready.'
            },
            {
                icon: <AiOutlineTool />,
                title: 'TypeScript First',
                desc: 'Full type inference, factory pattern components, styles api control.'
            }
        ]
    }
}

const FeaturesSection: React.FC = () => {
    const [locale] = useLocale(locales)

    return (
        <Group title={locale.title} description={locale.desc} id="features">
            <div className={classes.grid}>
                {locale.features.map((feature, index) => (
                    <Card key={index} className={classes.card} padding="lg" withBorder>
                        <span className={classes.icon}>{feature.icon}</span>
                        <Title order={5} className={classes.cardTitle}>
                            {feature.title}
                        </Title>
                        <Text component="p" c="dimmed" size="sm">
                            {feature.desc}
                        </Text>
                    </Card>
                ))}
            </div>
        </Group>
    )
}

export default FeaturesSection
