import React from 'react'
import { ScrollArea } from '@react-ui/ui'

const ScrollAreaDemo: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ScrollArea h={200} w={400}>
                <div style={{ width: 600, padding: 16 }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <p key={i} style={{ margin: '8px 0' }}>
                            垂直与水平滚动示例 - 行 {i + 1}
                        </p>
                    ))}
                </div>
            </ScrollArea>

            <ScrollArea h={160} w={400} type="never">
                <div style={{ padding: 16 }}>
                    {Array.from({ length: 15 }).map((_, i) => (
                        <p key={i} style={{ margin: '8px 0' }}>
                            不显示自定义滚动条 - 行 {i + 1}
                        </p>
                    ))}
                </div>
            </ScrollArea>

            <ScrollArea h={160} w={400} scrollbarSize={6}>
                <div style={{ padding: 16 }}>
                    {Array.from({ length: 15 }).map((_, i) => (
                        <p key={i} style={{ margin: '8px 0' }}>
                            细滚动条示例 - 行 {i + 1}
                        </p>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default ScrollAreaDemo
