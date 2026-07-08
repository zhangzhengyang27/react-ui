'use client'

import { useState } from 'react'
import { Button, Group, Stepper } from '@react-ui/ui'

export default function StepperInteractiveDemo() {
    const [active, setActive] = useState(0)

    return (
        <>
            <Stepper active={active} onStepClick={setActive} allowSelectStep>
                <Stepper.Step label="购物车" description="确认商品" />
                <Stepper.Step label="配送" description="填写地址" />
                <Stepper.Step label="支付" description="完成付款" />
            </Stepper>

            <Group mt="md">
                <Button variant="default" onClick={() => setActive(a => Math.max(0, a - 1))}>
                    上一步
                </Button>
                <Button onClick={() => setActive(a => Math.min(2, a + 1))}>下一步</Button>
            </Group>
        </>
    )
}
