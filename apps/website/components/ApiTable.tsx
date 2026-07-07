'use client'

import React from 'react'

export interface ApiProp {
    name: string
    type: string
    default?: string
    description: string
}

export interface ApiTableProps {
    component: 'Button' | 'ScrollArea'
}

const apiData: Record<string, ApiProp[]> = {
    Button: [
        {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'compact-xs' | 'compact-sm' | 'compact-md' | 'compact-lg' | 'compact-xl'",
            default: "'sm'",
            description: 'Controls button height, font-size and horizontal padding'
        },
        {
            name: 'color',
            type: 'MantineColor',
            default: 'theme.primaryColor',
            description: 'Key of theme.colors or any valid CSS color'
        },
        {
            name: 'justify',
            type: "CSSProperties['justifyContent']",
            default: "'center'",
            description: 'Sets justify-content of inner element'
        },
        { name: 'leftSection', type: 'React.ReactNode', description: 'Content on the left side of the button label' },
        { name: 'rightSection', type: 'React.ReactNode', description: 'Content on the right side of the button label' },
        { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Sets width: 100%' },
        {
            name: 'radius',
            type: 'MantineRadius',
            default: 'theme.defaultRadius',
            description: 'Key of theme.radius or any valid CSS value'
        },
        {
            name: 'gradient',
            type: 'MantineGradient',
            default: 'theme.defaultGradient',
            description: 'Gradient configuration for variant="gradient"'
        },
        { name: 'disabled', type: 'boolean', description: 'Sets disabled attribute, applies disabled styles' },
        { name: 'children', type: 'React.ReactNode', description: 'Button content' },
        { name: 'loading', type: 'boolean', description: 'If set, the Loader component is displayed over the button' },
        {
            name: 'loaderProps',
            type: 'LoaderProps',
            description: 'Props added to the Loader component (only visible when loading is set)'
        },
        {
            name: 'autoContrast',
            type: 'boolean',
            description: 'If set, adjusts text color based on background color for filled variant'
        }
    ],
    ScrollArea: [
        {
            name: 'scrollbarSize',
            type: 'number | string',
            default: "'12px'",
            description: 'Scrollbar size, numbers are converted to rem'
        },
        { name: 'type', type: "'always' | 'never'", default: "'always'", description: 'Defines scrollbars behavior' },
        {
            name: 'scrollbars',
            type: "'x' | 'y' | 'xy' | false",
            default: "'xy'",
            description: 'Axis at which scrollbars must be rendered'
        },
        {
            name: 'offsetScrollbars',
            type: "boolean | 'x' | 'y'",
            default: 'false',
            description: 'Determines whether scrollbars should be offset with padding on given axis'
        },
        {
            name: 'viewportRef',
            type: 'React.Ref<HTMLDivElement>',
            description: 'Assigns viewport element (scrollable container) ref'
        },
        {
            name: 'viewportProps',
            type: "React.ComponentProps<'div'>",
            description: 'Props passed down to the viewport element'
        },
        {
            name: 'onScrollPositionChange',
            type: '(position: { x: number; y: number }) => void',
            description: 'Called with current position when viewport is scrolled'
        },
        {
            name: 'onBottomReached',
            type: '() => void',
            description: 'Called when scrollarea is scrolled to the bottom'
        },
        {
            name: 'onTopReached',
            type: '() => void',
            description: 'Called when scrollarea is scrolled all the way to the top'
        },
        { name: 'onLeftReached', type: '() => void', description: 'Called when scrollarea is scrolled to the left' },
        { name: 'onRightReached', type: '() => void', description: 'Called when scrollarea is scrolled to the right' },
        {
            name: 'overscrollBehavior',
            type: "CSSProperties['overscrollBehavior']",
            description: 'Defines overscroll-behavior of the viewport'
        },
        {
            name: 'startScrollPosition',
            type: '{ x?: number; y?: number }',
            description: 'Initial scroll position set on mount'
        }
    ]
}

export function ApiTable({ component }: ApiTableProps) {
    const props = apiData[component]
    if (!props) {
        return <div>暂无 {component} 的 API 文档</div>
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--nextra-border-color, #333)' }}>
                        <th style={{ textAlign: 'left', padding: '12px 8px' }}>属性</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px' }}>类型</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px' }}>默认值</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px' }}>说明</th>
                    </tr>
                </thead>
                <tbody>
                    {props.map(prop => (
                        <tr key={prop.name} style={{ borderBottom: '1px solid var(--nextra-border-color, #222)' }}>
                            <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>{prop.name}</td>
                            <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>{prop.type}</td>
                            <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>{prop.default || '-'}</td>
                            <td style={{ padding: '12px 8px' }}>{prop.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
