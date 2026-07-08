'use client'

import React, { useState } from 'react'
import { Demo } from './Demo'

export interface PlaygroundProps<T> {
    title?: string
    description?: string
    initial: T
    controls: (state: T, setState: React.Dispatch<React.SetStateAction<T>>) => React.ReactNode
    renderPreview: (state: T) => React.ReactNode
    renderCode: (state: T) => string
}

export function Playground<T>({
    title,
    description,
    initial,
    controls,
    renderPreview,
    renderCode
}: PlaygroundProps<T>) {
    const [state, setState] = useState<T>(initial)

    return (
        <Demo
            title={title}
            description={description}
            controls={controls(state, setState)}
            code={renderCode(state)}
            defaultExpanded
        >
            {renderPreview(state)}
        </Demo>
    )
}
