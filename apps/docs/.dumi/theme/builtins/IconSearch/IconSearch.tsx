import React, { useCallback, useMemo, useState } from 'react'
import { EmptyState, SegmentedControl, TextInput } from '@xiaoye-react/ui'
import { useIntl } from 'dumi'
import debounce from 'lodash/debounce'
import { AiOutlineSearch } from '../../icons'

import Category from './Category'
import { allIcons, categories, type CategoriesKeys, type IconEntry } from './fields'
import classes from './IconSearch.module.css'

const ALL_VALUE = 'all'

const categoryOptions = [
    { value: ALL_VALUE, label: '全部' },
    ...(Object.keys(categories) as CategoriesKeys[]).map(key => ({
        value: key,
        label: categories[key]
    }))
]

const IconSearch: React.FC = () => {
    const intl = useIntl()
    const [searchKey, setSearchKey] = useState('')
    const [activeCategory, setActiveCategory] = useState<string>(ALL_VALUE)

    // debounce 实例必须稳定：在 render 中新建会让防抖失效（每次渲染重置计时器）
    const handleSearchIcon = useMemo(
        () =>
            debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchKey(e.target.value)
                document.getElementById('list-of-icons')?.scrollIntoView({ behavior: 'smooth' })
            }, 300),
        []
    )

    const handleChangeCategory = useCallback((value: string) => {
        setActiveCategory(value)
    }, [])

    const groupedIcons = useMemo<Record<CategoriesKeys, IconEntry[]>>(() => {
        const normalizedKey = searchKey.trim().toLowerCase()
        const groups = (Object.keys(categories) as CategoriesKeys[]).reduce<Record<CategoriesKeys, IconEntry[]>>(
            (acc, key) => {
                acc[key] = []
                return acc
            },
            {} as Record<CategoriesKeys, IconEntry[]>
        )

        allIcons.forEach(entry => {
            if (activeCategory !== ALL_VALUE && entry.category !== activeCategory) {
                return
            }
            if (normalizedKey) {
                const matched =
                    entry.name.toLowerCase().includes(normalizedKey) ||
                    entry.tags.some(tag => tag.toLowerCase().includes(normalizedKey))
                if (!matched) return
            }
            groups[entry.category].push(entry)
        })

        return groups
    }, [searchKey, activeCategory])

    const hasAnyIcon = (Object.keys(groupedIcons) as CategoriesKeys[]).some(key => groupedIcons[key].length > 0)

    return (
        <div className="markdown">
            <div className={classes.searchBar}>
                <SegmentedControl
                    size="md"
                    value={activeCategory}
                    onChange={handleChangeCategory}
                    data={categoryOptions}
                />
                <TextInput
                    placeholder={intl.formatMessage(
                        { id: 'app.docs.components.icon.search.placeholder' },
                        { total: allIcons.length }
                    )}
                    leftSection={<AiOutlineSearch />}
                    onChange={handleSearchIcon}
                />
            </div>
            <div id="list-of-icons">
                {hasAnyIcon ? (
                    (Object.keys(groupedIcons) as CategoriesKeys[]).map(key =>
                        groupedIcons[key].length ? <Category key={key} title={key} icons={groupedIcons[key]} /> : null
                    )
                ) : (
                    <EmptyState
                        title="未找到匹配的图标"
                        description="尝试使用其他关键字或切换分类"
                        style={{ margin: '2em 0' }}
                    />
                )}
            </div>
        </div>
    )
}

export default IconSearch
