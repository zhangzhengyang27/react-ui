import { useState } from 'react'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle'
import { EnvelopeOpenIcon } from '@phosphor-icons/react/dist/csr/EnvelopeOpen'
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/csr/ShieldCheck'
import { UserCheckIcon } from '@phosphor-icons/react/dist/csr/UserCheck'
import { Stepper } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { useState } from 'react';
import { UserCheckIcon } from '@phosphor-icons/react/dist/csr/UserCheck';
import { EnvelopeOpenIcon } from '@phosphor-icons/react/dist/csr/EnvelopeOpen';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/csr/ShieldCheck';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Stepper } from '@xiaoye-react/ui';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      completedIcon={<CheckCircleIcon size={18} />}
    >
      <Stepper.Step
        icon={<UserCheckIcon size={18} />}
        label="步骤 1"
        description="创建账户"
      />
      <Stepper.Step
        icon={<EnvelopeOpenIcon size={18} />}
        label="步骤 2"
        description="验证邮箱"
      />
      <Stepper.Step
        icon={<ShieldCheckIcon size={18} />}
        label="步骤 3"
        description="获取完整访问权限"
      />
    </Stepper>
  );
}
`

function Demo() {
    const [active, setActive] = useState(1)

    return (
        <Stepper active={active} onStepClick={setActive} completedIcon={<CheckCircleIcon size={18} />}>
            <Stepper.Step icon={<UserCheckIcon size={18} />} label="步骤 1" description="创建账户" />
            <Stepper.Step icon={<EnvelopeOpenIcon size={18} />} label="步骤 2" description="验证邮箱" />
            <Stepper.Step icon={<ShieldCheckIcon size={18} />} label="步骤 3" description="获取完整访问权限" />
        </Stepper>
    )
}

export const icons: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
