import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiChevronDown, FiSearch } from '../../theme/icons'
import { Box, Highlight, ScrollArea, Text, TextInput, UnstyledButton } from '@xiaoye-react/ui'
import { useDisclosure, useHotkeys } from '@xiaoye-react/hooks'
import { COMBOBOX_EXAMPLES_DATA, ComboboxDemo } from '@xiaoye-react/docs-demos'
import type { ComboboxExample } from '@xiaoye-react/docs-demos'
import classes from './combobox.module.css'

interface ComboboxExamplesGroup {
    group: string
    items: ComboboxExample[]
}

function getGroupedData(data: ComboboxExample[]): ComboboxExamplesGroup[] {
    const items: Record<string, ComboboxExample[]> = {
        select: [],
        autocomplete: [],
        multiselect: [],
        dropdown: [],
        button: [],
        animations: [],
        virtualization: [],
        treeselect: [],
        other: []
    }

    data.forEach(item => {
        if (items[item.type]) items[item.type].push(item)
    })

    return [
        { group: '选择', items: items.select },
        { group: '自动完成', items: items.autocomplete },
        { group: '多选', items: items.multiselect },
        { group: '按钮', items: items.button },
        { group: '下拉', items: items.dropdown },
        { group: '动画', items: items.animations },
        { group: '虚拟化', items: items.virtualization },
        { group: '树选择', items: items.treeselect },
        { group: '其他', items: items.other }
    ].filter(g => g.items.length > 0)
}

function ComboboxLinksGroup({
    data,
    searchQuery,
    activeId,
    onNavigate
}: {
    data: ComboboxExamplesGroup
    searchQuery: string
    activeId: string
    onNavigate: (id: string) => void
}) {
    const [opened, { toggle, open }] = useDisclosure(true)

    useEffect(open, [searchQuery])

    if (data.items.length === 0) return null

    const items = data.items.map(item => (
        <button
            key={item.id}
            className={classes.link}
            data-navbar-link-active={activeId === item.id || undefined}
            onClick={() => onNavigate(item.id)}
        >
            <Highlight className={classes.linkTitle} highlight={searchQuery}>
                {item.name}
            </Highlight>
            <Highlight className={classes.linkDescription} highlight={searchQuery}>
                {item.description}
            </Highlight>
        </button>
    ))

    return (
        <Box className={classes.group} mod={{ opened }}>
            <UnstyledButton className={classes.groupHeader} onClick={toggle}>
                <FiChevronDown className={classes.chevron} data-collapsed={!opened || undefined} />
                <Text className={classes.groupTitle}>{data.group}</Text>
            </UnstyledButton>
            {opened && items}
        </Box>
    )
}

export default function ComboboxPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const activeId = searchParams.get('e') || ''

    const splittedSearch = search
        .toLowerCase()
        .split(' ')
        .filter(item => item.trim().length > 0)

    const filteredData = COMBOBOX_EXAMPLES_DATA.filter(item => {
        const splittedName = item.name
            .toLowerCase()
            .split(' ')
            .filter(p => p.trim().length > 0)
        const splittedDescription = item.description
            .toLowerCase()
            .split(' ')
            .filter(p => p.trim().length > 0)
        return splittedSearch.every(
            part =>
                splittedName.some(name => name.includes(part)) ||
                splittedDescription.some(name => name.includes(part)) ||
                item.type.includes(part)
        )
    })

    const groupedData = getGroupedData(filteredData)

    const handleNavigate = (id: string) => {
        setSearchParams({ e: id }, { replace: true })
    }

    useHotkeys([['mod + shift + k', () => searchInputRef.current?.focus()]], [])

    return (
        <div className={classes.root}>
            <nav className={classes.navbar}>
                <TextInput
                    placeholder="Ctrl + Shift + K 搜索"
                    classNames={{ root: classes.search, input: classes.searchInput }}
                    leftSection={<FiSearch className={classes.searchIcon} />}
                    radius="md"
                    size="md"
                    value={search}
                    onChange={event => setSearch(event.currentTarget.value)}
                    ref={searchInputRef}
                />
                <ScrollArea className={classes.scroll} type="always" scrollbarSize={6}>
                    {groupedData.map(item => (
                        <ComboboxLinksGroup
                            data={item}
                            key={item.group}
                            searchQuery={search}
                            activeId={activeId}
                            onNavigate={handleNavigate}
                        />
                    ))}
                    <Text className={classes.empty}>未找到...</Text>
                </ScrollArea>
            </nav>
            <main className={classes.main}>
                <ComboboxDemo />
            </main>
        </div>
    )
}
