import React from 'react'
import { Button, Provider } from '@react-ui/ui'

const variants = ['default', 'filled', 'gradient', 'light', 'outline', 'subtle', 'transparent', 'white'] as const

const App: React.FC = () => {
    return (
        <Provider>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <section>
                    <h3>基础使用</h3>
                    <Button variant="default">请点击</Button>
                </section>

                <section>
                    <h3>按钮变体</h3>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {variants.map(v => (
                            <Button key={v} variant={v}>
                                {v}
                            </Button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3>禁用</h3>
                    <Button disabled>cannot click me</Button>
                </section>
            </div>
        </Provider>
    )
}

export default App
