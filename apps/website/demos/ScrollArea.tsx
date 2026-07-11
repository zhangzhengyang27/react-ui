import React from 'react'
import { ScrollArea } from '@react-ui/ui'

const ScrollAreaDemo: React.FC = () => {
    return (
        <ScrollArea style={{ height: 200, width: 400 }}>
            <div
                style={{
                    height: 600,
                    width: 800,
                    background: 'linear-gradient(to bottom right, #888, #333)'
                }}
            />
        </ScrollArea>
    )
}

export default ScrollAreaDemo
