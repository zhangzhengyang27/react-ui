import React, { cloneElement, isValidElement } from 'react';
import { AiOutlineBug } from 'react-icons/ai';
import { Button, Drawer, Flex, Popover, Pill, Timeline } from '@react-ui/ui';

import type { ChangelogInfo } from '../../../hooks/useChangelog';
import useChangelog from '../../../hooks/useChangelog';
import useLocale from '../../../hooks/useLocale';
import useLocation from '../../../hooks/useLocation';
import { matchDeprecated } from '../../utils';
import Link from '../Link';
import styles from './ComponentChangelog.module.css';

const locales = {
  cn: {
    full: '查看完整日志',
    changelog: '更新日志',
    loading: '加载中...',
    empty: '暂无更新',
    bugList: 'Bug 版本',
  },
  en: {
    full: 'Full Changelog',
    changelog: 'Changelog',
    loading: 'loading...',
    empty: 'Nothing update',
    bugList: 'Bug Versions',
  },
};

interface ParseChangelogProps {
  changelog: string;
}

const ParseChangelog: React.FC<ParseChangelogProps> = (props) => {
  const { changelog = '' } = props;

  const parsedChangelog = React.useMemo(() => {
    const nodes: React.ReactNode[] = [];

    let isQuota = false;
    let isBold = false;
    let lastStr = '';

    for (let i = 0; i < changelog.length; i += 1) {
      const char = changelog[i];
      const isDoubleAsterisk = char === '*' && changelog[i + 1] === '*';

      if (char !== '`' && !isDoubleAsterisk) {
        lastStr += char;
      } else {
        let node: React.ReactNode = lastStr;
        if (isQuota) {
          node = <code key={`code-${i}`}>{node}</code>;
        } else if (isBold) {
          node = <strong key={`strong-${i}`}>{node}</strong>;
        }

        nodes.push(node);
        lastStr = '';
        if (char === '`') {
          isQuota = !isQuota;
        } else if (isDoubleAsterisk) {
          isBold = !isBold;
          i += 1; // Skip the next '*'
        }
      }
    }

    nodes.push(lastStr);

    return nodes;
  }, [changelog]);

  return <span>{parsedChangelog}</span>;
};

interface RefLinksProps {
  refs: string[];
  contributors: string[];
}

const RefLinks: React.FC<RefLinksProps> = ({ refs, contributors }) => {
  return (
    <>
      {refs?.map((ref) => (
        <React.Fragment key={ref}>
          <a
            className={styles.linkRef}
            key={ref}
            href={ref}
            target="_blank"
            rel="noopener noreferrer"
          >
            #{ref.match(/[^/]+$/)?.[0]}
          </a>
        </React.Fragment>
      ))}
      {contributors?.map((contributor) => (
        <React.Fragment key={contributor}>
          <a
            className={styles.linkRef}
            key={contributor}
            href={`https://github.com/${contributor}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{contributor}
          </a>
        </React.Fragment>
      ))}
    </>
  );
};

interface RenderChangelogListProps {
  changelogList: ChangelogInfo[];
}

const RenderChangelogList: React.FC<RenderChangelogListProps> = ({ changelogList }) => {
  const elements: React.ReactNode[] = [];
  const len = changelogList.length;
  for (let i = 0; i < len; i += 1) {
    const { refs, changelog, contributors } = changelogList[i];
    // Check if the next line is an image link and append it to the current line
    const nextChangelog = changelogList[i + 1]?.changelog || '';
    if (i + 1 < len && nextChangelog.trim().startsWith('<img')) {
      const parser = new DOMParser();
      const document = parser.parseFromString(nextChangelog, 'text/html');
      const imgElement = document.querySelector<HTMLImageElement>('img');
      elements.push(
        <li key={`img-${i}`}>
          <ParseChangelog changelog={changelog} />
          <RefLinks refs={refs} contributors={contributors} />
          <br />
          <img
            draggable={false}
            src={imgElement?.getAttribute('src') || ''}
            alt={imgElement?.getAttribute('alt') || ''}
            width={imgElement?.getAttribute('width') || ''}
          />
        </li>,
      );
      i += 1; // Skip the next line
    } else {
      elements.push(
        <li key={`changelog-${i}`}>
          <ParseChangelog changelog={changelog} />
          <RefLinks refs={refs} contributors={contributors} />
        </li>,
      );
    }
  }
  return <ul className={styles.listWrap}>{elements}</ul>;
};

const ComponentChangelog: React.FC<Readonly<React.PropsWithChildren>> = (props) => {
  const { children } = props;
  const [locale, lang] = useLocale(locales);
  const [show, setShow] = React.useState(false);
  const { pathname } = useLocation();

  const componentPath = pathname.match(/\/components\/([^/]+)/)?.[1] || '';

  const list = useChangelog(componentPath, lang);

  const timelineItems = React.useMemo(() => {
    const changelogMap: Record<string, ChangelogInfo[]> = {};

    list?.forEach((info) => {
      changelogMap[info.version] = changelogMap[info.version] || [];
      changelogMap[info.version].push(info);
    });

    return Object.keys(changelogMap).map((version) => {
      const changelogList = changelogMap[version];
      const bugVersionInfo = matchDeprecated(version);
      return (
        <Timeline.Item key={version}>
          <Flex className={styles.versionWrap} justify="flex-start" align="center" gap="md">
            <Button
              variant="transparent"
              color="gray"
              component="a"
              className={styles.versionTitle}
              href={`/changelog${lang === 'cn' ? '-cn' : ''}/#${version.replace(/\./g, '').replace(/\s.*/g, '-')}`}
            >
              {version}
              {bugVersionInfo.match && (
                <Popover position="right" width={300}>
                  <Popover.Target>
                    <span className={styles.bug}>
                      <AiOutlineBug />
                    </span>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <div className={styles.bugReasonTitle}>{locale.bugList}</div>
                    <ul className={styles.bugReasonList}>
                      {bugVersionInfo.reason.map<React.ReactNode>((reason, index) => (
                        <li key={`reason-${index}`}>
                          <a target="_blank" rel="noopener noreferrer" href={reason}>
                            <AiOutlineBug />
                            {reason
                              ?.replace(/#.*$/, '')
                              ?.replace(
                                /^https:\/\/github\.com\/ant-design\/ant-design\/(issues|pull)\//,
                                '#',
                              )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Popover.Dropdown>
                </Popover>
              )}
            </Button>
            <Pill className={styles.versionTag} size="sm">
              {changelogList[0]?.releaseDate}
            </Pill>
          </Flex>
          <RenderChangelogList changelogList={changelogList} />
        </Timeline.Item>
      );
    });
  }, [lang, list, locale.bugList]);

  if (!pathname.startsWith('/components/') || !list || !list.length) {
    return null;
  }

  return (
    <>
      {isValidElement<React.HTMLAttributes<HTMLElement>>(children) &&
        cloneElement(children, {
          onClick: () => setShow(true),
        })}
      <Drawer
        opened={show}
        onClose={() => setShow(false)}
        position="right"
        size="lg"
        title={
          <div className={styles.drawerTitle}>
            <span>{locale.changelog}</span>
            <Link
              className={styles.extraLink}
              to={`/changelog${lang === 'cn' ? '-cn' : ''}`}
            >
              {locale.full}
            </Link>
          </div>
        }
      >
        <Timeline>{timelineItems}</Timeline>
      </Drawer>
    </>
  );
};

export default ComponentChangelog;
