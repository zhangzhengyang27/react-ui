import React from 'react'
import { Anchor } from '@react-ui/ui'

const AnchorDemo: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Anchor href="https://mantine.dev" target="_blank">
                默认 hover 下划线
            </Anchor>
            <Anchor underline="always">始终下划线</Anchor>
            <Anchor underline="never">从不下划线</Anchor>
            <Anchor underline="not-hover">悬停时消失</Anchor>
        </div>
    )
}

export default AnchorDemo
