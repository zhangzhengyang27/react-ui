import React from 'react';
import { UIProvider } from '@xiaoye-react/ui';

import SiteContext from '../../../theme/slots/SiteContext';

interface ReactUIDemoWrapperProps {
  children: React.ReactNode;
  colorScheme?: 'light' | 'dark';
}

const ReactUIDemoWrapper: React.FC<ReactUIDemoWrapperProps> = ({ children, colorScheme }) => {
  // UIProvider 会在 <html> 上写 data-ui-color-scheme（全局属性）。
  // 若不传 colorScheme，嵌套 Provider 默认 light，会把整站主题改写回亮色
  // （表现为切了暗色后进入首页又变亮）。默认跟随站点主题，显式传入时仍可覆盖。
  const siteContext = React.useContext(SiteContext);
  const siteIsDark = siteContext?.isDark ?? false;
  return <UIProvider colorScheme={colorScheme ?? (siteIsDark ? 'dark' : 'light')}>{children}</UIProvider>;
};

export default ReactUIDemoWrapper;
