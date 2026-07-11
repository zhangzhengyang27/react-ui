import Link from 'next/link';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { Box, Button } from '@react-ui/ui';
import { GithubIcon } from '@react-ui/dev-icons';
import { meta } from '@react-ui/mantine-meta';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import darkImg from './images/dark-collage.webp';
import lightImg from './images/light-collage.webp';
import classes from './HomePageJumbotron.module.css';

export function HomePageJumbotron() {
  return (
    <section className={classes.root}>
      <div className={classes.overlay} />
      <HomePageContainer className={classes.container}>
        <Box
          darkHidden
          className={classes.image}
          style={{ backgroundImage: `url(${lightImg.src})` }}
        />
        <Box
          lightHidden
          className={classes.image}
          style={{ backgroundImage: `url(${darkImg.src})` }}
        />
        <div className={classes.main}>
          <HomePageTitle order={1}>
            功能完备的 React
            <br /> 组件库
          </HomePageTitle>

          <HomePageDescription>
            更快地构建功能完备、无障碍的 Web 应用 —— ReactUI 提供 120+ 可定制组件和 30+ Hooks，
            覆盖各种开发场景
          </HomePageDescription>

          <div className={classes.actions}>
            <Button
              component={Link}
              href="/getting-started"
              className={classes.action}
              data-get-started
              justify="space-between"
              rightSection={<ArrowUpRightIcon size={26} />}
            >
              快速开始
            </Button>
            <Button
              className={classes.action}
              data-github
              rightSection={<GithubIcon size={26} />}
              justify="space-between"
              component="a"
              href={meta.gitHubLinks.reactui}
            >
              GitHub
            </Button>
          </div>
        </div>
      </HomePageContainer>
    </section>
  );
}
