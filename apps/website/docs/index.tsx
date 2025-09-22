import { useTheme } from 'antd-style'
import { MoonStar, Palette, Zap } from 'lucide-react'
import { Center } from 'react-layout-kit'

import { Features, FeaturesProps, Highlighter } from '@lobehub/ui'

const items: FeaturesProps['items'] = [
    {
        description: '提供浅色和深色主题的自定义算法，提供美观且用户友好的选项。',
        icon: Palette,
        title: '主题'
    },
    {
        description: '完全符合企业级组件库研发标准，架构思路部分借鉴 mantine，值得深入研究',
        icon: Zap,
        title: '企业级'
    },
    {
        description: '组件库内容逐步更新，可持续跟进',
        icon: MoonStar,
        title: '持续更新'
    }
]

const example = `import { Button } from '@react-ui/ui'

export default () => (
//     <MiaomaProvider>
    <Button>Hello xiaoye</Button>
    //     </MiaomaProvider>
)`

export default () => {
    const theme = useTheme()
    return (
        <Center gap={16}>
            <Center>
                <h2 style={{ fontSize: 20 }}>🤯 一起来学习最最接近企业级组件库开发流程与设计</h2>
                <div style={{ color: theme.colorTextDescription, textAlign: 'center' }}>
                    小叶科技官方 UI 组件库 @react-ui/ui，具备主流库特性{' '}
                    <a href="https://mantine.dev/" rel="noreferrer" target="_blank">
                        mantine
                    </a>
                    , 优雅的 API 设计, <br />
                    带你真正了解并掌握大厂团队基建设计思路 ，真正拿到产出。
                </div>
            </Center>
            <Highlighter language={'tsx'} style={{ width: '100%' }} type={'ghost'}>
                {example}
            </Highlighter>
            <Features items={items} />
        </Center>
    )
}
