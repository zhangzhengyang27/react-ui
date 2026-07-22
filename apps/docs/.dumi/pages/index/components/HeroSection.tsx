import React from 'react';
import { AiOutlineBgColors } from 'react-icons/ai';
import { Button, Group, Text, Title } from '@xiaoye-react/ui';
import { useLocation } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import LinkButton from '../../../theme/common/LinkButton';
import * as utils from '../../../theme/utils';

import classes from './HeroSection.module.css';

const locales = {
  cn: {
    slogan: '基于 React 的现代化组件库，Mantine 风格 API，内置 60+ 组件与 30+ Hooks。',
    subSlogan: '覆盖 Charts、Dates、Schedule、Form 等专业场景，主题随心，TypeScript 优先。',
    start: '快速开始',
    components: '浏览组件',
    aiTheme: 'AI 生成主题',
  },
  en: {
    slogan: 'A modern React component library with Mantine-style APIs.',
    subSlogan: '60+ components, 30+ hooks, plus Charts, Dates, Schedule and Form modules.',
    start: 'Getting Started',
    components: 'Browse Components',
    aiTheme: 'AI Theme',
  },
};

interface HeroSectionProps {
  onOpenPromptDrawer?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPromptDrawer }) => {
  const [locale] = useLocale(locales);
  const { pathname, search } = useLocation();
  const isZhCN = utils.isZhCN(pathname);

  return (
    <section className={classes.section}>
      <div className={classes.gradientBg} />
      <div className={classes.content}>
        <Title order={1} className={classes.title}>
          react-ui
        </Title>
        <Text component="p" className={classes.slogan}>
          {locale.slogan}
        </Text>
        <Text component="p" className={classes.subSlogan}>
          {locale.subSlogan}
        </Text>
        <Group gap="md" justify="center" wrap="wrap" className={classes.buttons}>
          <LinkButton
            size="large"
            type="primary"
            to={utils.getLocalizedPathname('/docs/react/getting-started/', isZhCN, search)}
          >
            {locale.start}
          </LinkButton>
          <LinkButton
            size="large"
            to={utils.getLocalizedPathname('/components/overview/', isZhCN, search)}
          >
            {locale.components}
          </LinkButton>
          {onOpenPromptDrawer && (
            <Button
              size="lg"
              variant="default"
              leftSection={<AiOutlineBgColors />}
              onClick={onOpenPromptDrawer}
            >
              {locale.aiTheme}
            </Button>
          )}
        </Group>
        <div className={classes.codeBlock}>npm install @xiaoye-react/ui @xiaoye-react/hooks</div>
      </div>
    </section>
  );
};

export default HeroSection;
