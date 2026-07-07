'use client'

import { useState } from 'react'
import { Button, Paper, Transition } from '@react-ui/ui'

export default function TransitionBasicDemo() {
    const [mounted, setMounted] = useState(false)
    return (
        <>
            <Button onClick={() => setMounted(m => !m)}>切换显隐</Button>
            <Transition mounted={mounted} transition="fade">
                {styles => <Paper style={{ ...styles, marginTop: 12, padding: 24 }}>淡入淡出内容</Paper>}
            </Transition>
        </>
    )
}
