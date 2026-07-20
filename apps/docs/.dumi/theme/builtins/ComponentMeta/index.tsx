import React from 'react';
import {
  AiOutlineBug,
  AiOutlineCompass,
  AiOutlineEdit,
  AiOutlineFileText,
  AiOutlineGithub,
  AiOutlineHistory,
  AiOutlineIssuesClose,
  AiOutlineLoading,
} from 'react-icons/ai';
import { Anchor, Divider, Flex, Text, Tooltip } from '@react-ui/ui';
import kebabCase from 'lodash/kebabCase';

import useIssueCount from '../../../hooks/useIssueCount';
import useLocale from '../../../hooks/useLocale';
import ComponentChangelog from '../../common/ComponentChangelog';
import Link from '../../common/Link';

import classes from './index.module.css';

const locales = {
  cn: {
    import: '使用',
    copy: '复制',
    copied: '已复制',
    source: '反馈',
    docs: '文档',
    edit: '编辑此页',
    changelog: '更新日志',
    design: '设计指南',
    version: '版本',
    issueNew: '提交问题',
    issueOpen: '待解决',
    copyError: '复制失败',
  },
  en: {
    import: 'Import',
    copy: 'Copy',
    copied: 'Copied',
    source: 'GitHub',
    docs: 'Docs',
    edit: 'Edit this page',
    changelog: 'Changelog',
    design: 'Design',
    version: 'Version',
    issueNew: 'Issue',
    issueOpen: 'Open issues',
    copyError: 'Copy failed',
  },
};

const branchUrl = (repo: string) => `https://github.com/${repo}/edit/master/`;

function isVersionNumber(value?: string) {
  return value && /^\d+\.\d+\.\d+$/.test(value);
}

const transformComponentName = (componentName: string) => {
  if (componentName === 'Notification' || componentName === 'Message') {
    return componentName.toLowerCase();
  }
  return componentName;
};

export interface ComponentMetaProps {
  component?: string;
  source?: string | true;
  filename?: string;
  llmsPath?: string;
  version?: string;
  designUrl?: string;
  searchTitleKeywords?: string[];
  repo: string;
  showImport?: boolean;
  showEdit?: boolean;
  showChangelog?: boolean;
}

const ComponentMeta: React.FC<ComponentMetaProps> = (props) => {
  const {
    component,
    source,
    filename,
    llmsPath,
    version,
    designUrl,
    searchTitleKeywords,
    repo,
    showImport = true,
    showEdit = true,
    showChangelog = true,
  } = props;
  const [locale, lang] = useLocale(locales);
  const isZhCN = lang === 'cn';

  // ======================== Source ========================
  const [filledSource, abbrSource, componentLlmsPath] = React.useMemo(() => {
    if (String(source) === 'true' && component) {
      const kebabComponent = kebabCase(component);
      return [
        `https://github.com/${repo}/blob/master/components/${kebabComponent}`,
        `components/${kebabComponent}`,
        null,
      ];
    }

    if (typeof source !== 'string') {
      return [null, null, null];
    }

    return [source, source, null];
  }, [component, repo, source, isZhCN]);

  const filledLlmsPath = llmsPath ?? componentLlmsPath;
  const showDocs = (showEdit && filename) || designUrl || filledLlmsPath || showChangelog;

  // ======================= Issues Count =======================
  const { issueCount, issueCountLoading, issueNewUrl, issueSearchUrl } = useIssueCount({
    repo,
    enabled: false,
    titleKeywords: searchTitleKeywords,
  });

  // ========================= Copy =========================
  const [copied, setCopied] = React.useState(false);

  const importCode =
    component === 'Icon'
      ? `import { ThemeIcon } from '@react-ui/ui';`
      : component
        ? `import { ${transformComponentName(component)} } from '@react-ui/ui';`
        : '';

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(importCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <div className={classes.descriptions}>
        {showImport && component && (
          <div className={classes.row}>
            <div className={classes.label}>{locale.import}</div>
            <div className={classes.value}>
              <Tooltip position="right" label={copied ? locale.copied : locale.copy}>
                <Text
                  span
                  className={classes.code}
                  style={{ cursor: 'pointer' }}
                  onClick={onCopy}
                >
                  {importCode}
                </Text>
              </Tooltip>
            </div>
          </div>
        )}
        {filledSource && (
          <div className={classes.row}>
            <div className={classes.label}>{locale.source}</div>
            <div className={classes.value}>
              <Flex justify="flex-start" align="center" gap="sm">
                <Anchor className={classes.code} href={filledSource} target="_blank">
                  <AiOutlineGithub className={classes.icon} />
                  <span>{abbrSource}</span>
                </Anchor>
                <Anchor className={classes.code} href={issueNewUrl} target="_blank">
                  <AiOutlineBug className={classes.icon} />
                  <span>{locale.issueNew}</span>
                </Anchor>
                <Anchor className={classes.code} href={issueSearchUrl} target="_blank">
                  <AiOutlineIssuesClose className={classes.icon} />
                  <span>
                    {locale.issueOpen} {issueCountLoading ? <AiOutlineLoading /> : issueCount}
                  </span>
                </Anchor>
              </Flex>
            </div>
          </div>
        )}
        {showDocs && (
          <div className={classes.row}>
            <div className={classes.label}>{locale.docs}</div>
            <div className={classes.value}>
              <Flex justify="flex-start" align="center" gap="sm">
                {showEdit && filename && (
                  <Anchor
                    className={classes.code}
                    href={`${branchUrl(repo)}${filename}`}
                    target="_blank"
                  >
                    <AiOutlineEdit className={classes.icon} />
                    <span>{locale.edit}</span>
                  </Anchor>
                )}
                {designUrl && (
                  <Link className={classes.code} to={designUrl}>
                    <AiOutlineCompass className={classes.icon} />
                    <span>{locale.design}</span>
                  </Link>
                )}
                {filledLlmsPath && (
                  <Anchor
                    className={classes.code}
                    href={filledLlmsPath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineFileText className={classes.icon} />
                    <span>LLMs.md</span>
                  </Anchor>
                )}
                {showChangelog && (
                  <ComponentChangelog>
                    <Anchor className={classes.code} component="button">
                      <AiOutlineHistory className={classes.icon} />
                      <span>{locale.changelog}</span>
                    </Anchor>
                  </ComponentChangelog>
                )}
              </Flex>
            </div>
          </div>
        )}
        {isVersionNumber(version) && (
          <div className={classes.row}>
            <div className={classes.label}>{locale.version}</div>
            <div className={classes.value}>
              <Text span className={classes.code}>
                {isZhCN ? `自 ${version} 起支持` : `supported since ${version}`}
              </Text>
            </div>
          </div>
        )}
      </div>
      <Divider />
    </>
  );
};

export default ComponentMeta;
