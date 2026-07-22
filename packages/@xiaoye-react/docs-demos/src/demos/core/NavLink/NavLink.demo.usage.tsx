import {
  CaretRightIcon,
  GaugeIcon,
  HeartbeatIcon,
  HouseIcon,
  ProhibitIcon,
} from '@phosphor-icons/react';
import { Badge, NavLink } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Badge, NavLink } from '@xiaoye-react/ui';
import { HouseIcon, GaugeIcon, CaretRightIcon, HeartbeatIcon, ProhibitIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <NavLink
        href="#required-for-focus"
        label="带图标"
        leftSection={<HouseIcon size={16} />}
      />
      <NavLink
        href="#required-for-focus"
        label="带右侧区域"
        leftSection={<GaugeIcon size={16} />}
        rightSection={
          <CaretRightIcon size={12} className="ui-rotate-rtl" />
        }
      />
      <NavLink
        href="#required-for-focus"
        label="已禁用"
        leftSection={<ProhibitIcon size={16} />}
        disabled
      />
      <NavLink
        href="#required-for-focus"
        label="带描述"
        description="附加信息"
        leftSection={
          <Badge size="xs" color="red" circle>
            3
          </Badge>
        }
      />
      <NavLink
        href="#required-for-focus"
        label="轻微激活"
        leftSection={<HeartbeatIcon size={16} />}
        rightSection={
          <CaretRightIcon size={12} className="ui-rotate-rtl" />
        }
        variant="subtle"
        active
      />
      <NavLink
        href="#required-for-focus"
        label="浅色激活"
        leftSection={<HeartbeatIcon size={16} />}
        rightSection={
          <CaretRightIcon size={12} className="ui-rotate-rtl" />
        }
        active
      />
      <NavLink
        href="#required-for-focus"
        label="填充激活"
        leftSection={<HeartbeatIcon size={16} />}
        rightSection={
          <CaretRightIcon size={12} className="ui-rotate-rtl" />
        }
        variant="filled"
        active
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NavLink href="#required-for-focus" label="带图标" leftSection={<HouseIcon size={16} />} />
      <NavLink
        href="#required-for-focus"
        label="带右侧区域"
        leftSection={<GaugeIcon size={16} />}
        rightSection={<CaretRightIcon size={12} className="ui-rotate-rtl" />}
      />
      <NavLink
        href="#required-for-focus"
        label="已禁用"
        leftSection={<ProhibitIcon size={16} />}
        disabled
      />
      <NavLink
        href="#required-for-focus"
        label="带描述"
        description="附加信息"
        leftSection={
          <Badge size="xs" color="red" circle>
            3
          </Badge>
        }
      />
      <NavLink
        href="#required-for-focus"
        label="轻微激活"
        leftSection={<HeartbeatIcon size={16} />}
        rightSection={<CaretRightIcon size={12} className="ui-rotate-rtl" />}
        variant="subtle"
        active
      />
      <NavLink
        href="#required-for-focus"
        label="浅色激活"
        leftSection={<HeartbeatIcon size={16} />}
        rightSection={<CaretRightIcon size={12} className="ui-rotate-rtl" />}
        active
      />
      <NavLink
        href="#required-for-focus"
        label="填充激活"
        leftSection={<HeartbeatIcon size={16} />}
        rightSection={<CaretRightIcon size={12} className="ui-rotate-rtl" />}
        variant="filled"
        active
      />
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 240,
  component: Demo,
  code,
};
