'use client'

import { Stepper } from '@react-ui/ui'

export default function StepperBasicDemo() {
    return (
        <Stepper active={1}>
            <Stepper.Step label="第一步" description="创建账户" />
            <Stepper.Step label="第二步" description="验证信息" />
            <Stepper.Step label="第三步" description="完成注册" />
        </Stepper>
    )
}
