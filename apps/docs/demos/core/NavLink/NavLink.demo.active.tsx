import { useState } from 'react'
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight'
import { FingerprintIcon } from '@phosphor-icons/react/dist/csr/Fingerprint'
import { GaugeIcon } from '@phosphor-icons/react/dist/csr/Gauge'
import { HeartbeatIcon } from '@phosphor-icons/react/dist/csr/Heartbeat'
import { Box, Group, NavLink } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { useState } from 'react';
import { GaugeIcon } from '@phosphor-icons/react/dist/csr/Gauge';
import { FingerprintIcon } from '@phosphor-icons/react/dist/csr/Fingerprint';
import { HeartbeatIcon } from '@phosphor-icons/react/dist/csr/Heartbeat';
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight';
import { Box, NavLink } from '@xiaoye-react/ui';

const data = [
  { icon: GaugeIcon, label: '仪表盘', description: '带描述的项目' },
  {
    icon: FingerprintIcon,
    label: '安全',
    rightSection: <CaretRightIcon size={16} />,
  },
  { icon: HeartbeatIcon, label: '活动' },
];

function Demo() {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      leftSection={<item.icon size={16} />}
      onClick={() => setActive(index)}
      {{props}}
    />
  ));

  return <Box w={220}>{items}</Box>;
}
`

const data = [
    { icon: GaugeIcon, label: '仪表盘', description: '带描述的项目' },
    {
        icon: FingerprintIcon,
        label: '安全',
        rightSection: <CaretRightIcon size={16} className="ui-rotate-rtl" />
    },
    { icon: HeartbeatIcon, label: '活动' }
]

function Demo(props: any) {
    const [active, setActive] = useState(0)

    const items = data.map((item, index) => (
        <NavLink
            key={item.label}
            active={index === active}
            label={item.label}
            description={item.description}
            rightSection={item.rightSection}
            leftSection={<item.icon size={16} />}
            onClick={() => setActive(index)}
            {...props}
        />
    ))

    return (
        <Group justify="center">
            <Box w={220}>{items}</Box>
        </Group>
    )
}

export const active: UIDemo = {
    type: 'configurator',
    component: Demo,
    code,
    controls: [
        { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
        {
            prop: 'variant',
            type: 'segmented',
            data: [
                { value: 'subtle', label: '柔和' },
                { value: 'light', label: '浅色' },
                { value: 'filled', label: '填充' }
            ],

            libraryValue: 'light',
            initialValue: 'light'
        }
    ]
}
