import React, { useCallback, useEffect } from 'react';
import { getSandpackCssText } from '@codesandbox/sandpack-react';
import dayjs from 'dayjs';
import { createSearchParams, useOutlet, useSearchParams, useServerInsertedHTML } from 'dumi';
import { UIProvider } from '@xiaoye-react/ui';

import { DarkContext } from '../../hooks/useDark';
import useLayoutState from '../../hooks/useLayoutState';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getBannerData } from '../../pages/index/components/util';
import GaScript from '../common/GaScript';
import HotKeysHandler from '../common/HotKeysHandler';
import { REACT_UI_SITE_THEME } from '../common/ThemeSwitch';
import type { ThemeName } from '../common/ThemeSwitch';
import type { SiteContextProps } from '../slots/SiteContext';
import SiteContext from '../slots/SiteContext';

type SiteState = Partial<Omit<SiteContextProps, 'updateSiteConfig'>>;

const RESPONSIVE_MOBILE = 768;

export const REACT_UI_NOT_SHOW_BANNER = 'REACT_UI_NOT_SHOW_BANNER';

// Compatible with old anchors
if (typeof window !== 'undefined') {
  const hashId = location.hash.slice(1);
  if (hashId.startsWith('components-')) {
    if (!document.querySelector(`#${hashId}`)) {
      location.hash = `#${hashId.replace(/^components-/, '')}`;
    }
  }
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const isThemeDark = (theme: ThemeName[], systemTheme: 'light' | 'dark') => {
  return theme.includes('dark') || (theme.includes('auto') && systemTheme === 'dark');
};

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const [searchParams, setSearchParams] = useSearchParams();
  const [
    { theme = [], direction, isMobile, bannerVisible = false, dynamicTheme, isDark = false },
    setSiteState,
  ] = useLayoutState<SiteState>({
    isMobile: false,
    direction: 'ltr',
    theme: [],
    isDark: false,
    bannerVisible: false,
    dynamicTheme: undefined,
  });

  const [storedTheme] = useLocalStorage<ThemeName>(REACT_UI_SITE_THEME, {
    defaultValue: undefined,
  });

  const [bannerLastTime] = useLocalStorage<string>(REACT_UI_NOT_SHOW_BANNER, {
    defaultValue: undefined,
  });

  // 获取最终主题（优先级：URL Query > Local Storage > Site (Memory)）
  const getFinalTheme = (urlTheme: ThemeName[]): ThemeName[] => {
    // 只认 light/dark
    const baseTheme = urlTheme.filter((t) => !['light', 'dark', 'auto'].includes(t));
    const urlColor = urlTheme.find((t) => t === 'light' || t === 'dark');
    if (urlColor) {
      return [...baseTheme, urlColor];
    }
    if (['light', 'dark', 'auto'].includes(storedTheme)) {
      return [...baseTheme, storedTheme];
    }
    return [...baseTheme, 'auto'];
  };

  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>(() => getSystemTheme());

  const bannerData = getBannerData();

  const updateSiteConfig = useCallback(
    (props: SiteState) => {
      setSiteState((prev) => ({ ...prev, ...props }));

      const oldSearchStr = searchParams.toString();

      let nextSearchParams: URLSearchParams = searchParams;
      Object.entries(props).forEach((kv) => {
        const [key, value] = kv as [string, string];

        if (key === 'direction') {
          if (value === 'rtl') {
            nextSearchParams.set('direction', 'rtl');
          } else {
            nextSearchParams.delete('direction');
          }
        }
        if (key === 'theme') {
          const arr = Array.isArray(value) ? value : [value];
          const base = arr.filter((t) => !['light', 'dark', 'auto'].includes(t));
          const color = arr.find((t) => t === 'light' || t === 'dark');
          if (color) {
            nextSearchParams = createSearchParams({ ...nextSearchParams, theme: [...base, color] });
          } else {
            nextSearchParams.delete('theme');
          }
        }
      });

      if (nextSearchParams.toString() !== oldSearchStr) {
        setSearchParams(nextSearchParams);
      }
    },
    [searchParams, setSearchParams],
  );

  const updateMobileMode = useCallback(() => {
    updateSiteConfig({ isMobile: window.innerWidth < RESPONSIVE_MOBILE });
  }, [updateSiteConfig]);

  // 设置 data-prefers-color / data-ui-color-scheme 属性和 isDark 状态
  useEffect(() => {
    const color = theme.find((t) => t === 'light' || t === 'dark');
    const html = document.querySelector<HTMLHtmlElement>('html');
    const resolvedColor = theme.includes('auto') && systemTheme ? systemTheme : color;
    if (resolvedColor) {
      html?.setAttribute('data-prefers-color', resolvedColor);
      html?.setAttribute('data-ui-color-scheme', resolvedColor);
    }

    setSiteState((prev) => ({ ...prev, isDark: isThemeDark(theme, systemTheme) }));
  }, [systemTheme, theme]);

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // 主题初始化
  useEffect(() => {
    const urlTheme = searchParams.getAll('theme') as ThemeName[];
    const finalTheme = getFinalTheme(urlTheme);
    const _direction = searchParams.get('direction') as 'rtl' | 'ltr' | undefined;
    const _isDark = isThemeDark(finalTheme, systemTheme);

    const storedBannerVisible = bannerLastTime && dayjs().diff(dayjs(bannerLastTime), 'day') >= 1;

    const isZhCN = typeof window !== 'undefined' && window.location.pathname.includes('-cn');

    const hasBannerContent = isZhCN && !!bannerData;

    setSiteState({
      theme: finalTheme,
      isDark: _isDark,
      direction: _direction === 'rtl' ? 'rtl' : 'ltr',
      bannerVisible: hasBannerContent && (bannerLastTime ? !!storedBannerVisible : true),
    });

    // Handle isMobile
    updateMobileMode();

    window.addEventListener('resize', updateMobileMode);
    return () => {
      window.removeEventListener('resize', updateMobileMode);
    };
  }, [bannerData, bannerLastTime, searchParams, systemTheme, updateMobileMode]);

  const siteContextValue = React.useMemo<SiteContextProps>(
    () => ({
      direction,
      updateSiteConfig,
      theme: theme!,
      isDark: isDark!,
      isMobile: isMobile!,
      bannerVisible,
      dynamicTheme,
    }),
    [isMobile, direction, updateSiteConfig, theme, isDark, bannerVisible, dynamicTheme],
  );

  useServerInsertedHTML(() => (
    <style
      data-sandpack="true"
      id="sandpack"
      dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
    />
  ));

  return (
    <UIProvider colorScheme={isDark ? 'dark' : 'light'}>
      <DarkContext.Provider value={isDark}>
        <SiteContext.Provider value={siteContextValue}>{outlet}</SiteContext.Provider>
      </DarkContext.Provider>
      <HotKeysHandler />
      <GaScript />
    </UIProvider>
  );
};

export default GlobalLayout;
