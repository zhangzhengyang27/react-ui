import Link from 'next/link'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { Anchor, Box, SimpleGrid, Title } from '@react-ui/ui'
import {
  AutocompleteHighlight,
  MaxSelectedItems,
  MultiSelectCreatable,
  SelectDropdownSearch,
  SelectOptionComponent,
  TransferList,
} from '@react-ui/docs-demos';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer'
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription'
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore'
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle'
import classes from './HomePageCombobox.module.css'

const comboboxExamples: ComboboxDemoProps[] = [
    {
        title: '带搜索高亮的自动完成',
        name: 'AutocompleteHighlight',
        component: AutocompleteHighlight
    },
    {
        title: '限制选中项数量的多选',
        name: 'MaxSelectedItems',
        component: MaxSelectedItems
    },
    { title: '可创建选项的多选', name: 'MultiSelectCreatable', component: MultiSelectCreatable },
    {
        title: '下拉框内搜索的选择器',
        name: 'SelectDropdownSearch',
        component: SelectDropdownSearch
    },
    {
        title: '自定义选项组件的选择器',
        name: 'SelectOptionComponent',
        component: SelectOptionComponent
    },
    {
        title: '穿梭框',
        name: 'TransferList',
        component: TransferList
    }
]

interface ComboboxDemoProps {
    title: string
    name: string
    hiddenOnMobile?: boolean
    component: React.FC
}

function ComboboxDemo({ title, name, hiddenOnMobile, component: Component }: ComboboxDemoProps) {
    return (
        <Box visibleFrom={hiddenOnMobile ? 'sm' : undefined} className={classes.demo}>
            <header className={classes.demoHeader}>
                <Title order={3} className={classes.demoTitle}>
                    {title}
                </Title>

                <Anchor component={Link} href={`/combobox/?e=${name}`} className={classes.demoLink}>
                    <span>查看示例代码</span>
                    <ArrowUpRightIcon size={16} />
                </Anchor>
            </header>

            <div className={classes.demoArea}>
                <Component />
            </div>
        </Box>
    )
}

export function HomePageCombobox() {
    const demos = comboboxExamples.map(demo => <ComboboxDemo key={demo.name} {...demo} />)

    return (
        <section className={classes.root}>
            <HomePageContainer>
                <HomePageTitle order={2}>Combobox 组件</HomePageTitle>

                <HomePageDescription className={classes.description}>
                    Combobox 是一个可组合组件，可用于创建自定义选择器、多选、自动完成、标签输入等类似组件。
                    它提供了极大的灵活性，让你完全控制 UI 和行为，同时保持代码库简洁清晰。
                </HomePageDescription>

                <HomePageLearnMore href="/combobox/?e=BasicSelect">探索 50+ Combobox 示例</HomePageLearnMore>

                <SimpleGrid cols={{ lg: 3, sm: 2 }} className={classes.grid}>
                    {demos}
                </SimpleGrid>
            </HomePageContainer>
        </section>
    )
}
