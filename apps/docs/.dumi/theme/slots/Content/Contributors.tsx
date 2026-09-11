import React, { Suspense } from 'react';
import { useIntl } from 'dumi';
import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

import SiteContext from '../SiteContext';
import ContributorAvatar from './ContributorAvatar';
import type { AvatarListItem } from './ContributorAvatar';

import classes from './Contributors.module.css';

interface ContributorsProps {
  filename?: string;
}

interface ContributorsData {
  logins: string[];
  components: Record<string, number[]>;
  blog: Record<string, number[]>;
  react: Record<string, number[]>;
  spec: Record<string, number[]>;
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const MODULE_PATTERNS: ReadonlyArray<[RegExp, string]> = [
  [/^components\/([^/]+)\/index\.(zh-CN|en-US)\.md$/, 'components'],
  [/^docs\/blog\/(.+)\.(zh-CN|en-US)\.md$/, 'blog'],
  [/^docs\/react\/(.+)\.(zh-CN|en-US)\.md$/, 'react'],
  [/^docs\/spec\/(.+)\.(zh-CN|en-US)\.md$/, 'spec'],
];

function getContributorKey(filename?: string): string | null {
  for (const [pattern, module] of MODULE_PATTERNS) {
    const match = filename?.match(pattern);
    if (match) {
      const [, key] = match;
      return `${module}/${key}`;
    }
  }
  return null;
}

const CONTRIBUTORS_URL = '/contributors.json';

const swrConfig: SWRConfiguration<ContributorsData, Error> = {
  // contributors.json 目前没有对应的生成脚本，生产环境会 404：静默降级为不展示
  errorRetryCount: 0,
};

const Contributors: React.FC<ContributorsProps> = ({ filename }) => {
  const { formatMessage } = useIntl();
  const dataKey = getContributorKey(filename);

  const { data, error, isLoading } = useSWR<ContributorsData, Error>(
    process.env.NODE_ENV === 'production' && dataKey ? CONTRIBUTORS_URL : null,
    fetcher,
    swrConfig,
  );

  if (error) {
    return null;
  }

  if (!dataKey || !data || isLoading) {
    return null;
  }

  const [module, ...rest] = dataKey.split('/');
  const key = rest.join('/');
  const indices = (data[module as keyof ContributorsData] as Record<string, number[]>)?.[key] ?? [];

  if (!indices.length) {
    return null;
  }

  const contributors = indices.map<AvatarListItem>((i) => {
    const login = data.logins[i];
    return { username: login, url: `https://github.com/${login}.png?size=24` };
  });

  return (
    <div>
      <div className={classes.title}>{formatMessage({ id: 'app.content.contributors' })}</div>
      <ul className={classes.list}>
        {contributors.map((item) => (
          <ContributorAvatar item={item} key={item.username} />
        ))}
      </ul>
    </div>
  );
};

const SuspenseContributors: React.FC<ContributorsProps> = (props) => (
  <Suspense fallback={null}>
    <Contributors {...props} />
  </Suspense>
);

export default SuspenseContributors;
