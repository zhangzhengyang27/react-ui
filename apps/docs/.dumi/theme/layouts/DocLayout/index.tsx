import { clsx } from 'clsx';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Helmet, useOutlet, useSearchParams, useSiteData } from 'dumi';
import useLocale from '../../../hooks/useLocale';
import useLocation from '../../../hooks/useLocation';
import { RouteMetaProvider } from '../../common/RouteMetaContext';
import GlobalStyles from '../../common/GlobalStyles';
import Header from '../../slots/Header';
import SiteContext from '../../slots/SiteContext';
import IndexLayout from '../IndexLayout';
import ResourceLayout from '../ResourceLayout';
import SidebarLayout from '../SidebarLayout';


const locales = {
  cn: {
    title: 'react-ui - 小叶的 React UI 组件库',
    description: '小叶的 React UI 组件库，基于 CSS Modules 与工厂模式构建。',
  },
  en: {
    title: "react-ui - xiaoye's React UI component library",
    description:
      "xiaoye's React UI component library, built with CSS Modules and factory pattern.",
  },
};

// hash 滚动需要等异步 chunk 加载完后再跳锚点，因此要订阅 siteData.loading。
// 该订阅必须留在叶子组件里：loading 在每个懒加载 chunk 加载前后都会翻转，
// 若在布局层订阅，每次翻转都会重渲染 Header + Sidebar + 全部已挂载 demo。
const HashScroller: React.FC<{ hash: string }> = ({ hash }) => {
  const { loading } = useSiteData();

  useEffect(() => {
    const id = hash.replace('#', '');
    if (id) {
      document.getElementById(decodeURIComponent(id))?.scrollIntoView();
    }
  }, [loading, hash]);

  return null;
};

const DocLayout: React.FC = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const { pathname, search, hash } = location;
  const [locale, lang] = useLocale(locales);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null!);
  const { direction } = React.use(SiteContext);
  const [searchParams] = useSearchParams();
  const hideLayout = searchParams.get('layout') === 'false';

  useLayoutEffect(() => {
    if (lang === 'cn') {
      dayjs.locale('zh-cn');
    } else {
      dayjs.locale('en');
    }
  }, [lang]);

  useEffect(() => {
    const nprogressHiddenStyle = document.getElementById('nprogress-style');
    timerRef.current = setTimeout(() => {
      nprogressHiddenStyle?.remove();
    }, 0);
    return () => clearTimeout(timerRef.current);
  }, []);

  // handle hash change or visit page hash from Link component, and jump after async chunk loaded
  // （已下沉到 HashScroller 叶子组件，见顶部说明）

  useEffect(() => {
    if (typeof (window as any).ga !== 'undefined') {
      (window as any).ga('send', 'pageview', pathname + search);
    }
  }, [pathname, search]);

  const content = React.useMemo<React.ReactNode>(() => {
    if (['', '/'].includes(pathname) || ['/index'].some((path) => pathname.startsWith(path))) {
      return (
        <IndexLayout title={locale.title} desc={locale.description}>
          {outlet}
        </IndexLayout>
      );
    }
    if (pathname.startsWith('/docs/resource')) {
      return <ResourceLayout>{outlet}</ResourceLayout>;
    }
    if (pathname.startsWith('/theme-editor') || pathname.startsWith('/theme-market')) {
      return outlet;
    }
    return <SidebarLayout>{outlet}</SidebarLayout>;
  }, [pathname, outlet, locale.title, locale.description]);

  return (
    <>
      <Helmet encodeSpecialCharacters={false}>
        <html
          lang={lang === 'cn' ? 'zh-CN' : lang}
          data-direction={direction}
          className={clsx({ rtl: direction === 'rtl' })}
        />
        <link
          sizes="144x144"
          href="/favicon.svg"
        />
        <meta property="og:description" content={locale.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="/favicon.svg"
        />
      </Helmet>
      <GlobalStyles />
      {!hideLayout && <Header />}
      <HashScroller hash={hash} />
      <RouteMetaProvider>{content}</RouteMetaProvider>
    </>
  );
};

export default DocLayout;
