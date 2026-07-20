import { useState } from 'react';
import { CaretRightIcon, FingerprintIcon, GaugeIcon, HeartbeatIcon } from '@phosphor-icons/react';
import { Box, Group, NavLink } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { GaugeIcon, FingerprintIcon, HeartbeatIcon, CaretRightIcon } from '@phosphor-icons/react';
import { Box, NavLink } from '@react-ui/ui';

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
      href="#required-for-focus"
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
`;

const data = [
  { icon: GaugeIcon, label: '仪表盘', description: '带描述的项目' },
  {
    icon: FingerprintIcon,
    label: '安全',
    rightSection: <CaretRightIcon size={16} className="ui-rotate-rtl" />,
  },
  { icon: HeartbeatIcon, label: '活动' },
];

function Demo(props: any) {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      href="#required-for-focus"
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      leftSection={<item.icon size={16} />}
      onClick={() => setActive(index)}
      {...props}
    />
  ));

  return (
    <Group justify="center">
      <Box w={220}>{items}</Box>
    </Group>
  );
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
        { value: 'filled', label: '填充' },
      ],

      libraryValue: 'light',
      initialValue: 'light',
    },
  ],
};
