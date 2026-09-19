import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight'
import { GaugeIcon } from '@phosphor-icons/react/dist/csr/Gauge'
import { HeartbeatIcon } from '@phosphor-icons/react/dist/csr/Heartbeat'
import { HouseIcon } from '@phosphor-icons/react/dist/csr/House'
import { ProhibitIcon } from '@phosphor-icons/react/dist/csr/Prohibit'
import { Badge, NavLink } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { Badge, NavLink } from '@xiaoye-react/ui';
import { HouseIcon } from '@phosphor-icons/react/dist/csr/House';
import { GaugeIcon } from '@phosphor-icons/react/dist/csr/Gauge';
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight';
import { HeartbeatIcon } from '@phosphor-icons/react/dist/csr/Heartbeat';
import { ProhibitIcon } from '@phosphor-icons/react/dist/csr/Prohibit';
function Demo() {
  return (
    <>
      <NavLink
        label="带图标"
        leftSection={<HouseIcon size={16} />}
      />
      <NavLink
        label="带右侧区域"
        leftSection={<GaugeIcon size={16} />}
        rightSection={
          <CaretRightIcon size={12} className="ui-rotate-rtl" />
        }
      />
      <NavLink
        label="已禁用"
        leftSection={<ProhibitIcon size={16} />}
        disabled
      />
      <NavLink
        label="带描述"
        description="附加信息"
        leftSection={
          <Badge size="xs" color="red" circle>
            3
          </Badge>
        }
      />
      <NavLink
        label="轻微激活"
        leftSection={<HeartbeatIcon size={16} />}
        rightSection={
          <CaretRightIcon size={12} className="ui-rotate-rtl" />
        }
        variant="subtle"
        active
      />
      <NavLink
        label="浅色激活"
        leftSection={<HeartbeatIcon size={16} />}
        rightSection={
          <CaretRightIcon size={12} className="ui-rotate-rtl" />
        }
        active
      />
      <NavLink
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
`

function Demo() {
    return (
        <>
            <NavLink label="带图标" leftSection={<HouseIcon size={16} />} />
            <NavLink
                label="带右侧区域"
                leftSection={<GaugeIcon size={16} />}
                rightSection={<CaretRightIcon size={12} className="ui-rotate-rtl" />}
            />
            <NavLink label="已禁用" leftSection={<ProhibitIcon size={16} />} disabled />
            <NavLink
                label="带描述"
                description="附加信息"
                leftSection={
                    <Badge size="xs" color="red" circle>
                        3
                    </Badge>
                }
            />
            <NavLink
                label="轻微激活"
                leftSection={<HeartbeatIcon size={16} />}
                rightSection={<CaretRightIcon size={12} className="ui-rotate-rtl" />}
                variant="subtle"
                active
            />
            <NavLink
                label="浅色激活"
                leftSection={<HeartbeatIcon size={16} />}
                rightSection={<CaretRightIcon size={12} className="ui-rotate-rtl" />}
                active
            />
            <NavLink
                label="填充激活"
                leftSection={<HeartbeatIcon size={16} />}
                rightSection={<CaretRightIcon size={12} className="ui-rotate-rtl" />}
                variant="filled"
                active
            />
        </>
    )
}

export const usage: UIDemo = {
    type: 'code',
    centered: true,
    maxWidth: 240,
    component: Demo,
    code
}
