import { useState } from 'react'
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { XIcon } from '@phosphor-icons/react/dist/csr/X'
import { Box, PasswordInput, Popover, Progress, Text } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { useState } from 'react';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { PasswordInput, Progress, Text, Popover, Box } from '@xiaoye-react/ui';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <CheckIcon size={14} /> : <XIcon size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: '包含数字' },
  { re: /[a-z]/, label: '包含小写字母' },
  { re: /[A-Z]/, label: '包含大写字母' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: '包含特殊符号' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function Demo() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            label="你的密码"
            placeholder="你的密码"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement label="至少包含 6 个字符" meets={value.length > 5} />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
`

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text c={meets ? 'teal' : 'red'} style={{ display: 'flex', alignItems: 'center' }} mt={7} size="sm">
            {meets ? <CheckIcon size={14} /> : <XIcon size={14} />}
            <Box ml={10}>{label}</Box>
        </Text>
    )
}

const requirements = [
    { re: /[0-9]/, label: '包含数字' },
    { re: /[a-z]/, label: '包含小写字母' },
    { re: /[A-Z]/, label: '包含大写字母' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: '包含特殊符号' }
]

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1

    requirements.forEach(requirement => {
        if (!requirement.re.test(password)) {
            multiplier += 1
        }
    })

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
}

function Demo() {
    const [popoverOpened, setPopoverOpened] = useState(false)
    const [value, setValue] = useState('')
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ))

    const strength = getStrength(value)
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

    return (
        <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
            <Popover.Target>
                <div onFocusCapture={() => setPopoverOpened(true)} onBlurCapture={() => setPopoverOpened(false)}>
                    <PasswordInput
                        withAsterisk
                        label="你的密码"
                        placeholder="你的密码"
                        value={value}
                        onChange={event => setValue(event.currentTarget.value)}
                    />
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement label="至少包含 6 个字符" meets={value.length > 5} />
                {checks}
            </Popover.Dropdown>
        </Popover>
    )
}

export const strengthMeter: UIDemo = {
    type: 'code',
    code,
    component: Demo,
    centered: true,
    maxWidth: 340
}
