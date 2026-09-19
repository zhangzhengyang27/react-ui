import { FingerprintIcon } from '@phosphor-icons/react/dist/csr/Fingerprint'
import { GaugeIcon } from '@phosphor-icons/react/dist/csr/Gauge'
import { NavLink } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { NavLink } from '@xiaoye-react/ui';
import { GaugeIcon } from '@phosphor-icons/react/dist/csr/Gauge';
import { FingerprintIcon } from '@phosphor-icons/react/dist/csr/Fingerprint';
function Demo() {
  return (
    <>
      <NavLink
        label="第一个父链接"
        leftSection={<GaugeIcon size={16} />}
      >
        <NavLink label="第一个子链接" />
        <NavLink label="第二个子链接" />
        <NavLink label="嵌套父链接">
          <NavLink label="第一个子链接" />
          <NavLink label="第二个子链接" />
          <NavLink label="第三个子链接" />
        </NavLink>
      </NavLink>

      <NavLink
        label="第二个父链接"
        leftSection={<FingerprintIcon size={16} />}
        defaultOpened
      >
        <NavLink label="第一个子链接" />
        <NavLink label="第二个子链接" />
        <NavLink label="第三个子链接" />
      </NavLink>
    </>
  );
}
`

function Demo() {
    return (
        <>
            <NavLink
                label="第一个父链接"
                leftSection={<GaugeIcon size={16} />}
            >
                <NavLink label="第一个子链接" />
                <NavLink label="第二个子链接" />
                <NavLink label="嵌套父链接">
                    <NavLink label="第一个子链接" />
                    <NavLink label="第二个子链接" />
                    <NavLink label="第三个子链接" />
                </NavLink>
            </NavLink>

            <NavLink
                label="第二个父链接"
                leftSection={<FingerprintIcon size={16} />}
                defaultOpened
            >
                <NavLink label="第一个子链接" />
                <NavLink label="第二个子链接" />
                <NavLink label="第三个子链接" />
            </NavLink>
        </>
    )
}

export const nested: UIDemo = {
    type: 'code',
    centered: true,
    maxWidth: 240,
    component: Demo,
    code
}
