import { UISize } from '../../../core'

export type ClearSectionMode =
    | 'both'
    | 'rightSection'
    | 'clear'

export interface InputClearSectionProps {
    __clearable: boolean | undefined
    __clearSection: React.ReactNode
    rightSection: React.ReactNode
    __defaultRightSection: React.ReactNode
    size: UISize | string | undefined
    __clearSectionMode: ClearSectionMode | undefined
}

const clearSectionOffset: Record<string, number> = {
    xs: 7,
    sm: 8,
    md: 10,
    lg: 12,
    xl: 15
}

export function InputClearSection({
    __clearable,
    __clearSection,
    rightSection,
    __defaultRightSection,
    size = 'sm',
    __clearSectionMode = 'both'
}: InputClearSectionProps) {
    const clearSection = __clearable && __clearSection

    if (__clearSectionMode === 'rightSection') {
        return rightSection === null ? null : rightSection || __defaultRightSection
    }

    if (__clearSectionMode === 'clear') {
        return rightSection === null ? null : clearSection || __defaultRightSection
    }

    if (clearSection && (rightSection || __defaultRightSection)) {
        return (
            <div
                data-combined-clear-section
                style={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    paddingInlineEnd: clearSectionOffset[size]
                }}
            >
                {clearSection}
                {rightSection || __defaultRightSection}
            </div>
        )
    }

    return rightSection === null ? null : rightSection || clearSection || __defaultRightSection
}
