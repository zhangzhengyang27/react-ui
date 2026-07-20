import React, { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Button, Stack, Text, Title } from '@react-ui/ui';
import { useLocation } from 'dumi';

import Link from '../../theme/common/Link';
import * as utils from '../../theme/utils';

import classes from './index.module.css';

export interface NotFoundProps {
  router: {
    push: (pathname: string) => void;
    replace: (pathname: string) => void;
  };
}

const DIRECT_MAP: Record<string, string> = {};

const NotFoundPage: React.FC<NotFoundProps> = ({ router }) => {
  const { pathname } = useLocation();

  const isZhCN = utils.isZhCN(pathname);

  useEffect(() => {
    const directLinks = Object.keys(DIRECT_MAP);
    for (let i = 0; i < directLinks.length; i += 1) {
      const matchPath = directLinks[i];
      if (pathname.includes(matchPath)) {
        router.replace(utils.getLocalizedPathname(`/${DIRECT_MAP[matchPath]}`, isZhCN).pathname);
      }
    }

    // Report if necessary
    const { yuyanMonitor } = window as any;
    yuyanMonitor?.log({
      code: 11,
      msg: `Page not found: ${location.href}; Source: ${document.referrer}`,
    });
  }, [isZhCN, pathname, router]);

  return (
    <Stack align="center" justify="center" gap="md" className={classes.root}>
      <Title order={1} className={classes.code}>
        404
      </Title>
      <Text size="lg" c="dimmed">
        {isZhCN ? '你访问的页面貌似不存在？' : 'Sorry, the page you visited does not exist.'}
      </Text>
      <Link to={utils.getLocalizedPathname('/', isZhCN)}>
        <Button variant="filled" size="lg" leftSection={<AiOutlineHome />}>
          {isZhCN ? '返回 react-ui 首页' : 'Back to home page'}
        </Button>
      </Link>
    </Stack>
  );
};

export default NotFoundPage;
