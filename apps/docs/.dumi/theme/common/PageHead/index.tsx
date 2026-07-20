import { useEffect } from 'react';

interface PageHeadProps {
  title: string | undefined;
  description: string | undefined;
}

const metaDescription =
  'React 组件与 Hooks 库，内置原生深色主题支持，专注于可用性、可访问性与开发者体验';

/**
 * 页面 head 信息管理。
 * 替代 Next.js 的 <Head> 组件，使用 useEffect 设置 document.title 和 meta。
 */
export function PageHead({ title, description }: PageHeadProps) {
  useEffect(() => {
    const _title = title ? `${title} | ReactUI` : 'ReactUI';
    const _description = description || metaDescription;

    document.title = _title;

    // 更新或创建 meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', _description);

    // og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', _title);

    // og:description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', _description);
  }, [title, description]);

  return null;
}

export default PageHead;
