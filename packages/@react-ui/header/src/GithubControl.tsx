import { GithubIcon } from '@react-ui/dev-icons';
import { HeaderControl } from './HeaderControl';

interface GithubControlProps {
  link: string;
}

export function GithubControl({ link }: GithubControlProps) {
  return (
    <HeaderControl tooltip="源代码" component="a" href={link}>
      <GithubIcon size={22} />
    </HeaderControl>
  );
}
