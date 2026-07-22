import * as React from 'react';
import { AiOutlineBug } from 'react-icons/ai';
import { clsx } from 'clsx';
import { Button, Flex, Popover } from '@xiaoye-react/ui';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import useLocale from '../../../hooks/useLocale';
import { matchDeprecated } from '../../utils';

import classes from './index.module.css';

interface RefinedChangelogProps {
  version?: string;
  date?: string;
}

interface ContextProps {
  version: string;
  date?: Dayjs;
  isDeprecated?: boolean;
  reason?: string[];
}

const ChangelogContext = React.createContext<ContextProps>({
  version: '0.0.0',
});

const locales = {
  cn: {
    deprecatedTitle: '🚨 该版本存在缺陷, 请升级至下一个新版本',
  },
  en: {
    deprecatedTitle: '🚨 This version has defects, please upgrade to the next version',
  },
};

const RefinedChangelog: React.FC<React.PropsWithChildren<RefinedChangelogProps>> = (props) => {
  const { version, date, children } = props;

  const memoizedValue = React.useMemo<ContextProps>(() => {
    const realVersion = version || '0.0.0';
    const bugVersionInfo = matchDeprecated(realVersion);
    return {
      version: realVersion,
      isDeprecated: !!bugVersionInfo?.match,
      reason: bugVersionInfo?.reason,
      date: date ? dayjs(date) : undefined,
    };
  }, [version, date]);

  return (
    <ChangelogContext value={memoizedValue}>
      <div
        className={clsx('refined-changelog', classes.container, {
          [classes.isDeprecated]: memoizedValue.isDeprecated,
        })}
      >
        {children}
      </div>
    </ChangelogContext>
  );
};

const Version: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isDeprecated, reason } = React.use(ChangelogContext);
  const [locale] = useLocale(locales);

  if (!isDeprecated) {
    return children;
  }

  const reasonContent = (
    <Flex direction="column" align="start" gap="xs">
      {reason?.map((item, index) => (
        <Button
          key={index}
          component="a"
          variant="subtle"
          target="_blank"
          rel="noopener noreferrer"
          href={item}
          leftSection={<AiOutlineBug />}
        >
          {item}
        </Button>
      ))}
    </Flex>
  );

  return (
    <Flex align="center" gap="sm">
      {children}
      <Popover position="right">
        <Popover.Target>
          <AiOutlineBug className={classes.bugIcon} />
        </Popover.Target>
        <Popover.Dropdown>
          <div className={classes.popoverTitle}>{locale.deprecatedTitle}</div>
          {reasonContent}
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
};

const DateComp: React.FC<React.PropsWithChildren> = (props) => props.children;

const DetailsComp: React.FC<React.PropsWithChildren<HTMLDivElement>> = (props) => {
  const { children, className } = props;
  return <div className={className}>{children}</div>;
};

export default Object.assign(RefinedChangelog, {
  Version,
  Date: DateComp,
  Details: DetailsComp,
});
