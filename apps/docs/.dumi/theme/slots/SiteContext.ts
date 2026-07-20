import * as React from 'react';

import { getBannerData } from '../../pages/index/components/util';
import type { ThemeName } from '../common/ThemeSwitch';

export interface SiteContextProps {
  isMobile: boolean;
  bannerVisible: boolean;
  direction: 'ltr' | 'rtl';
  theme: ThemeName[];
  // 主题存在跟随系统模式，解耦实际生效主题
  // 应使用 isDark 而非 theme.includes('dark') 等来判断当前主题
  isDark?: boolean;
  updateSiteConfig: (props: Partial<SiteContextProps>) => void;
  dynamicTheme?: {
    algorithm?: 'light' | 'dark';
    token: Record<string, string | number>;
  };
}

const SiteContext = React.createContext<SiteContextProps>({
  isMobile: false,
  bannerVisible: !!getBannerData(),
  direction: 'ltr',
  theme: ['light'],
  isDark: false,
  updateSiteConfig: () => {},
});

export default SiteContext;
