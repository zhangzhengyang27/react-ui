import React from 'react';
import { Group, Text, Title } from '@xiaoye-react/ui';
import { useLocation } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import LinkButton from '../../../theme/common/LinkButton';
import * as utils from '../../../theme/utils';

import classes from './FooterCTA.module.css';

const locales = {
  cn: {
    title: '开始使用 react-ui',
    desc: '跟随快速开始指南，几分钟内即可将 react-ui 集成到你的项目中。',
    start: '快速开始',
    github: 'GitHub',
  },
  en: {
    title: 'Get Started with react-ui',
    desc: 'Follow the getting started guide and integrate react-ui into your project in minutes.',
    start: 'Getting Started',
    github: 'GitHub',
  },
};

const FooterCTA: React.FC = () => {
  const [locale] = useLocale(locales);
  const { pathname, search } = useLocation();
  const isZhCN = utils.isZhCN(pathname);

  return (
    <section className={classes.section}>
      <Title order={2} className={classes.title}>
        {locale.title}
      </Title>
      <Text component="p" className={classes.desc}>
        {locale.desc}
      </Text>
      <Group gap="md" justify="center">
        <LinkButton
          size="large"
          type="primary"
          to={utils.getLocalizedPathname('/docs/react/getting-started/', isZhCN, search)}
        >
          {locale.start}
        </LinkButton>
        <LinkButton
          size="large"
          href="https://github.com/zhangzhengyang27/react-ui"
          target="_blank"
          rel="noopener noreferrer"
        >
          {locale.github}
        </LinkButton>
      </Group>
    </section>
  );
};

export default FooterCTA;
