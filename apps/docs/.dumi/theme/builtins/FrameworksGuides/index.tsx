import React from 'react';

interface FrameworkItem {
  title: string;
  description?: string;
  link: string;
  primary?: boolean;
}

const FRAMEWORKS: FrameworkItem[] = [
  { title: 'Vite', description: '单页应用（SPA）的最佳选择', link: '/docs/guides/vite', primary: true },
  { title: 'Next.js', description: '支持 SSR 的应用的最佳选择', link: '/docs/guides/next', primary: true },
  { title: 'React Router', description: 'React Router 入门', link: '/docs/guides/react-router' },
  { title: 'Redwood', description: 'RedwoodJS 入门', link: '/docs/guides/redwood' },
  { title: 'Gatsby', description: 'Gatsby 入门', link: '/docs/guides/gatsby' },
];

/**
 * 框架集成指南卡片网格。
 * 替代旧 website 的 FrameworksGuides（依赖 next/link + phosphor 图标 + @/components/icons）。
 * 这里用纯卡片网格实现，无额外图标依赖，链接指向 /guides/* 已迁移页面。
 */
const FrameworksGuides: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 16,
        margin: '16px 0',
      }}
    >
      {FRAMEWORKS.map((f) => (
        <a
          key={f.title}
          href={f.link}
          style={{
            display: 'block',
            padding: 24,
            border: '1px solid var(--ui-color-gray-3, #e5e7eb)',
            borderRadius: 12,
            textDecoration: 'none',
            color: 'inherit',
            position: 'relative',
            background: 'var(--ui-color-body, #fff)',
          }}
        >
          {f.primary && (
            <span
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                fontSize: 12,
                color: '#cf1322',
                border: '1px solid #cf1322',
                borderRadius: 10,
                padding: '0 8px',
              }}
            >
              Recommended
            </span>
          )}
          <div style={{ fontWeight: 600, fontSize: 16 }}>{f.title}</div>
          {f.description && (
            <div style={{ marginTop: 4, color: 'var(--ui-color-text-secondary, #666)', fontSize: 14 }}>
              {f.description}
            </div>
          )}
        </a>
      ))}
    </div>
  );
};

export default FrameworksGuides;
