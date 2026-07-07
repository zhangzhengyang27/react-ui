import React, { useState } from 'react'
import { Transition } from '@react-ui/ui'

const TransitionDemo: React.FC = () => {
    const [mounted, setMounted] = useState(true)
    return (
        <div>
            <button onClick={() => setMounted(v => !v)}>toggle</button>
            <div style={{ marginTop: 16 }}>
                <Transition mounted={mounted} transition="fade" duration={300}>
                    {styles => (
                        <div style={{ ...styles, padding: 16, background: '#eef', borderRadius: 8 }}>
                            淡入 / 淡出内容（fade 过渡）
                        </div>
                    )}
                </Transition>
            </div>
        </div>
    )
}

export default TransitionDemo
