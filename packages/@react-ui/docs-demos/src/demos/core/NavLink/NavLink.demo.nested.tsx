import { FingerprintIcon, GaugeIcon } from '@phosphor-icons/react';
import { NavLink } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NavLink } from '@react-ui/ui';
import { GaugeIcon, FingerprintIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <NavLink
        href="#required-for-focus"
        label="第一个父链接"
        leftSection={<GaugeIcon size={16} />}
        childrenOffset={28}
      >
        <NavLink href="#required-for-focus" label="第一个子链接" />
        <NavLink label="第二个子链接" href="#required-for-focus" />
        <NavLink label="嵌套父链接" childrenOffset={28} href="#required-for-focus">
          <NavLink label="第一个子链接" href="#required-for-focus" />
          <NavLink label="第二个子链接" href="#required-for-focus" />
          <NavLink label="第三个子链接" href="#required-for-focus" />
        </NavLink>
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="第二个父链接"
        leftSection={<FingerprintIcon size={16} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink label="第一个子链接" href="#required-for-focus" />
        <NavLink label="第二个子链接" href="#required-for-focus" />
        <NavLink label="第三个子链接" href="#required-for-focus" />
      </NavLink>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NavLink
        href="#required-for-focus"
        label="第一个父链接"
        leftSection={<GaugeIcon size={16} />}
        childrenOffset={28}
      >
        <NavLink href="#required-for-focus" label="第一个子链接" />
        <NavLink label="第二个子链接" href="#required-for-focus" />
        <NavLink label="嵌套父链接" childrenOffset={28} href="#required-for-focus">
          <NavLink label="第一个子链接" href="#required-for-focus" />
          <NavLink label="第二个子链接" href="#required-for-focus" />
          <NavLink label="第三个子链接" href="#required-for-focus" />
        </NavLink>
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="第二个父链接"
        leftSection={<FingerprintIcon size={16} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink label="第一个子链接" href="#required-for-focus" />
        <NavLink label="第二个子链接" href="#required-for-focus" />
        <NavLink label="第三个子链接" href="#required-for-focus" />
      </NavLink>
    </>
  );
}

export const nested: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 240,
  component: Demo,
  code,
};
