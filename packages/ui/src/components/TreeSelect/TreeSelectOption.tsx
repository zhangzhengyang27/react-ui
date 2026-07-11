import { AccordionChevron } from '../Accordion'
import { CheckboxIndicator } from '../Checkbox/CheckboxIndicator/CheckboxIndicator'
import { Combobox } from '../Combobox'
import type { TreeNodeData } from '../Tree'
import classes from './TreeSelect.module.css'

const LEVEL_OFFSET = 20
const BASE_PADDING = 8
const LINE_CONTENT_GAP = 5
const OPTION_GAP = 6

export interface TreeSelectChevronAriaLabels {
    expand?: string
    collapse?: string
}

export interface TreeSelectOptionProps {
    node: TreeNodeData
    level: number
    expanded: boolean
    hasChildren: boolean
    selected: boolean
    checked: boolean
    indeterminate: boolean
    showCheckbox: boolean
    isLastChild: boolean
    lineGuides: boolean[]
    withLines: boolean
    onToggleExpand: (value: string) => void
    renderNode?: (payload: TreeSelectRenderNodePayload) => React.ReactNode
    chevronAriaLabels?: TreeSelectChevronAriaLabels
}

export interface TreeSelectRenderNodePayload {
    node: TreeNodeData
    level: number
    expanded: boolean
    hasChildren: boolean
    selected: boolean
    checked: boolean
    indeterminate: boolean
}

export function TreeSelectOption({
    node,
    level,
    expanded,
    hasChildren,
    selected,
    checked,
    indeterminate,
    showCheckbox,
    isLastChild,
    lineGuides,
    withLines,
    onToggleExpand,
    renderNode,
    chevronAriaLabels,
}: TreeSelectOptionProps) {
    const indentPx = (level - 1) * LEVEL_OFFSET

    const handleExpandClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        onToggleExpand(node.value)
    }

    const handleExpandMouseDown = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    const customContent = renderNode
        ? renderNode({ node, level, expanded, hasChildren, selected, checked, indeterminate })
        : null

    const lineElements =
        withLines && level > 1 ? (
            <>
                {lineGuides.map((show, g) =>
                    show ? (
                        <span
                            key={`g${g}`}
                            className={classes.guideLine}
                            style={{
                                insetInlineStart: BASE_PADDING + (g + 1) * LEVEL_OFFSET - LEVEL_OFFSET / 2,
                            }}
                        />
                    ) : null
                )}
                <span
                    className={classes.branchVertical}
                    data-last={isLastChild || undefined}
                    style={{
                        insetInlineStart: BASE_PADDING + (level - 1) * LEVEL_OFFSET - LEVEL_OFFSET / 2,
                    }}
                />
                <span
                    className={classes.branchHorizontal}
                    style={{
                        insetInlineStart: BASE_PADDING + (level - 1) * LEVEL_OFFSET - LEVEL_OFFSET / 2,
                        width: LEVEL_OFFSET / 2,
                    }}
                />
            </>
        ) : null

    const isActive = selected || checked
    const showCheckMark = !showCheckbox && isActive
    const ariaChecked = showCheckbox ? (indeterminate && !checked ? 'mixed' : checked) : undefined

    return (
        <Combobox.Option
            value={node.value}
            disabled={node.nodeProps?.disabled}
            className={classes.option}
            style={{
                paddingInlineStart:
                    BASE_PADDING +
                    indentPx +
                    (withLines && level > 1 ? LINE_CONTENT_GAP : 0) +
                    (!hasChildren ? OPTION_GAP : 0),
            }}
            aria-selected={isActive}
            aria-level={level}
            aria-expanded={hasChildren ? expanded : undefined}
            aria-checked={ariaChecked}
        >
            {lineElements}
            {customContent || (
                <>
                    {hasChildren && (
                        <span
                            className={classes.expandIcon}
                            data-expanded={expanded || undefined}
                            onClick={handleExpandClick}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleExpandClick(e as any)
                                }
                            }}
                            onMouseDown={handleExpandMouseDown}
                            role="button"
                            tabIndex={-1}
                            aria-label={
                                expanded
                                    ? (chevronAriaLabels?.collapse ?? 'Collapse')
                                    : (chevronAriaLabels?.expand ?? 'Expand')
                            }
                        >
                            <AccordionChevron size="80%" />
                        </span>
                    )}
                    {showCheckbox && (
                        <CheckboxIndicator
                            checked={checked || indeterminate}
                            indeterminate={!checked && indeterminate}
                            size="18px"
                        />
                    )}
                    <span className={classes.label}>{node.label}</span>
                    {showCheckMark && (
                        <svg
                            className={classes.checkIcon}
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                        >
                            <path
                                d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </>
            )}
        </Combobox.Option>
    )
}

TreeSelectOption.displayName = '@react-ui/ui/TreeSelectOption'
