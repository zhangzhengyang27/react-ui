import { FiCode, FiEdit3, FiTerminal, FiZap } from '../../../../theme/icons'
import { SimpleGrid } from '@xiaoye-react/ui'
import { HomePageContainer } from '../shared/Container'
import { HomePageDescription } from '../shared/Description'
import { HomePageFeatures, HomePageFeaturesData } from '../shared/Features'
import { HomePageLearnMore } from '../shared/LearnMore'
import { HomePageTitle } from '../shared/Title'
import classes from './FormSection.module.css'

const features: HomePageFeaturesData = [
    {
        icon: <FiZap size={30} />,
        title: '无缝集成',
        description: 'useForm Hook 与所有 ReactUI 输入组件开箱即用'
    },
    {
        icon: <FiTerminal size={30} />,
        title: '出色性能',
        description: 'useForm 仅在验证和状态变化时重新渲染，通常每个表单生命周期只渲染 2-3 次'
    },
    {
        icon: <FiCode size={30} />,
        title: '轻量级',
        description: '6.3kb 压缩后 + Gzip，除 React 外无其他依赖'
    },
    {
        icon: <FiEdit3 size={30} />,
        title: '功能完备',
        description: 'useForm 支持列表和嵌套对象、多种验证方式（包括基于 Zod 的 schema 验证），以及便捷的值更新订阅管理'
    }
]

export function FormSection() {
    return (
        <section className={classes.root}>
            <HomePageContainer>
                <SimpleGrid cols={{ md: 2 }} spacing={50} verticalSpacing={30}>
                    <div className={classes.column}>
                        <div className={classes.main}>
                            <HomePageTitle order={2}>表单库</HomePageTitle>
                            <HomePageDescription className={classes.description}>
                                @xiaoye-react/form — 专为 ReactUI 组件设计的高性能表单库，与所有 ReactUI 输入组件
                                开箱即用。
                            </HomePageDescription>
                            <HomePageLearnMore href="/docs/form/package">探索全部表单功能</HomePageLearnMore>
                            <HomePageFeatures data={features} />
                        </div>
                    </div>
                    <div className={classes.column}>
                        <div className={classes.codePreview}>
                            <pre className={classes.codeBlock}>
                                <code>{`import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    email: '',
  },
  validate: {
    email: (v) =>
      /^\\S+@\\S+$/.test(v)
        ? null
        : '邮箱格式不正确',
  },
});`}</code>
                            </pre>
                        </div>
                    </div>
                </SimpleGrid>
            </HomePageContainer>
        </section>
    )
}
