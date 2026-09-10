import { useState } from 'react'
import { EnvelopeOpenIcon } from '@phosphor-icons/react/dist/csr/EnvelopeOpen'
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/csr/ShieldCheck'
import { UserCheckIcon } from '@phosphor-icons/react/dist/csr/UserCheck'
import { Stepper } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { useState } from 'react';
import { Stepper } from '@xiaoye-react/ui';
import { UserCheckIcon } from '@phosphor-icons/react/dist/csr/UserCheck';
import { EnvelopeOpenIcon } from '@phosphor-icons/react/dist/csr/EnvelopeOpen';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/csr/ShieldCheck';
function Demo() {
  const [active, setActive] = useState(0);

  return (
    <Stepper active={active} onStepClick={setActive}>
      <Stepper.Step icon={<UserCheckIcon size={18} />} />
      <Stepper.Step icon={<EnvelopeOpenIcon size={18} />} />
      <Stepper.Step icon={<ShieldCheckIcon size={18} />} />
    </Stepper>
  );
}
`

function Demo() {
    const [active, setActive] = useState(0)
    return (
        <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step icon={<UserCheckIcon size={18} />} />
            <Stepper.Step icon={<EnvelopeOpenIcon size={18} />} />
            <Stepper.Step icon={<ShieldCheckIcon size={18} />} />
        </Stepper>
    )
}

export const iconsOnly: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
