import { ReactUILogoMark } from './ReactUILogoMark';
import { ReactUILogoText } from './ReactUILogoText';
import { LogoProps } from './use-react-ui-logo-colors';

export interface ReactUILogoProps extends LogoProps {
  type?: 'mark' | 'full';
}

export function ReactUILogo({ type, ...others }: ReactUILogoProps) {
  if (type === 'mark') {
    return <ReactUILogoMark {...others} />;
  }

  return <ReactUILogoText {...others} />;
}
