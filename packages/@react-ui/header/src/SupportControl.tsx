import { HeartIcon } from '@phosphor-icons/react';
import { rem } from '@react-ui/ui';
import { meta } from '@react-ui/meta';
import { HeaderControl } from './HeaderControl';
import classes from './SupportControl.module.css';

export function SupportControl() {
  return (
    <HeaderControl
      component="a"
      href={meta.gitHubLinks.reactui}
      tooltip="GitHub 仓库"
      aria-label="GitHub 仓库"
      className={classes.support}
    >
      <HeartIcon weight="fill" style={{ width: rem(22), height: rem(22) }} />
    </HeaderControl>
  );
}
