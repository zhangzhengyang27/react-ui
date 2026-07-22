import * as React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { Alert, Divider, EmptyState, Skeleton, Tabs } from '@xiaoye-react/ui';
import dayjs from 'dayjs';
import { FormattedMessage } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import type { Article, Authors, SiteData } from '../../../pages/index/components/util';
import { useReactUISiteConfig } from '../../../pages/index/components/util';
import classes from './index.module.css';

interface ArticleListProps {
  name: React.ReactNode;
  data: Article[];
  authors: Authors;
}

const ArticleList: React.FC<ArticleListProps> = ({ name, data = [], authors = [] }) => {
  return (
    <td>
      <h4 className={classes.columnTitle}>{name}</h4>
      <ul className={classes.articleList}>
        {data.length === 0 ? (
          <EmptyState title="No data" />
        ) : (
          data.map((article, index) => {
            const author = authors.find((auth) => auth.name === article.author);
            return (
              <li key={index} className={classes.articleItem}>
                <a href={author?.href} target="_blank" rel="noopener noreferrer">
                  <img
                    className={classes.avatar}
                    src={author?.avatar}
                    alt={author?.name}
                    width={24}
                    height={24}
                  />
                </a>
                <Divider orientation="vertical" />
                <a href={article.href} target="_blank" rel="noopener noreferrer">
                  {article?.title}
                </a>
              </li>
            );
          })
        )}
      </ul>
    </td>
  );
};

const Articles: React.FC<{ data?: Partial<SiteData> }> = ({ data = {} }) => {
  const [, lang] = useLocale();
  const isZhCN = lang === 'cn';

  const { articles = { cn: [], en: [] }, authors = [] } = data;

  // ========================== Data ==========================
  const mergedData = React.useMemo(() => {
    const yearData: Record<number | string, Record<string, Article[]>> = {};
    articles[lang]?.forEach((article) => {
      const year = dayjs(article.date).year();
      yearData[year] = yearData[year] || {};
      yearData[year][article.type] = [...(yearData[year][article.type] || []), article];
    });
    return yearData;
  }, [articles, lang]);

  const yearList = Object.keys(mergedData).sort((a, b) => Number(b) - Number(a));

  if (yearList.length === 0) {
    return null;
  }

  return (
    <Tabs defaultValue={yearList[0]} className={classes.tabs}>
      <Tabs.List justify="center">
        {yearList.map((year) => (
          <Tabs.Tab key={year} value={year}>
            {`${year}${isZhCN ? ' 年' : ''}`}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {yearList.map((year) => (
        <Tabs.Panel key={year} value={year}>
          <table className={classes.table}>
            <tbody>
              <tr>
                <ArticleList
                  name={<FormattedMessage id="app.docs.resource.design" />}
                  data={mergedData[year].design}
                  authors={authors}
                />
                <ArticleList
                  name={<FormattedMessage id="app.docs.resource.develop" />}
                  data={mergedData[year].develop}
                  authors={authors}
                />
              </tr>
            </tbody>
          </table>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

const ResourceArticles: React.FC = () => {
  const { data, error, isLoading } = useReactUISiteConfig();
  if (isLoading) {
    return <Skeleton height={120} />;
  }
  if (error) {
    return (
      <Alert
        variant="light"
        color="red"
        icon={<AiOutlineExclamationCircle />}
        title={error.message}
      >
        {process.env.NODE_ENV !== 'production' ? error.stack : undefined}
      </Alert>
    );
  }
  return (
    <div id="articles" className={classes.articles}>
      <Articles data={data} />
    </div>
  );
};

export default ResourceArticles;
