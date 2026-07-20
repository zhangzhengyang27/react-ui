import useSWR from 'swr';

export interface Author {
  avatar: string;
  href: string;
  type: 'design' | 'develop';
  name: string;
}

export interface Article {
  title: string;
  href: string;
  date: string;
  type: 'design' | 'develop';
  author: Author['name'];
}

export interface Recommendation {
  title?: string;
  img?: string;
  href?: string;
  popularize?: boolean;
  description?: string;
}

type SourceType = 'zhihu' | 'yuque';

export interface Extra {
  title: string;
  description: string;
  date: string;
  img: string;
  source: SourceType;
  href: string;
}

export interface Icon {
  name: string;
  href: string;
}

export type Articles = {
  cn: Article[];
  en: Article[];
};

export type Authors = Author[];

export type Recommendations = {
  cn: Recommendation[];
  en: Recommendation[];
};

export type Extras = {
  cn: Extra[];
  en: Extra[];
};

export type Icons = Icon[];

export type HeadingBanner = {
  [key in 'cn' | 'en']: {
    title?: string;
    href?: string;
  };
};

export type SiteData = {
  headingBanner: HeadingBanner;
  articles: Articles;
  authors: Authors;
  recommendations: Recommendations;
  extras: Extras;
  icons: Icons;
};

export function preLoad(list: string[]) {
  if (typeof window !== 'undefined') {
    // 图处预加载；
    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);
    list.forEach((src) => {
      const img = new Image();
      img.src = src;
      div.appendChild(img);
    });
  }
}

/**
 * Banner 硬编码，以防止页面闪烁问题
 * 返回 null 表示不显示
 */
export const getBannerData = (): null | {
  title: string;
  href: string;
} => {
  return null;
};

export const useReactUISiteConfig = () => {
  return { data: null, error: null, isLoading: false };
};
