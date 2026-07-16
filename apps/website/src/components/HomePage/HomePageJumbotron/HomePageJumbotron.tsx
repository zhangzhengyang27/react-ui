import Link from 'next/link';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { Button } from '@react-ui/ui';
import { GithubIcon } from '@react-ui/dev-icons';
import { meta } from '@react-ui/meta';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import classes from './HomePageJumbotron.module.css';

export function HomePageJumbotron() {
  return (
    <section className={classes.root}>
      <HomePageContainer className={classes.container}>
        <div className={classes.grid}>
          <div className={classes.main}>
            <HomePageTitle order={1}>
              构建无障碍、
              <br />
              高可定制的
              <br />
              Web 应用
            </HomePageTitle>

            <HomePageDescription>
              ReactUI 提供 120+ 可定制组件与 70+ Hooks，覆盖表单、浮层、导航、数据展示等全部场景，
              助你以更少代码交付更可靠的界面。
            </HomePageDescription>

            <div className={classes.actions}>
              <Button
                component={Link}
                href="/getting-started"
                className={classes.action}
                data-get-started
                justify="space-between"
                rightSection={<ArrowUpRightIcon size={22} />}
              >
                快速开始
              </Button>
              <Button
                className={classes.action}
                data-github
                rightSection={<GithubIcon size={22} />}
                justify="space-between"
                component="a"
                href={meta.gitHubLinks.reactui}
              >
                GitHub
              </Button>
            </div>

            <div className={classes.install}>
              <span className={classes.prompt}>$</span>
              <code>pnpm add @react-ui/ui</code>
            </div>
          </div>

          <PreviewCard />
        </div>
      </HomePageContainer>
    </section>
  );
}

function PreviewCard() {
  return (
    <div className={classes.preview}>
      <div className={classes.card}>
        <div className={classes.cardHeader}>
          <span className={classes.dot} />
          <span className={classes.dot} />
          <span className={classes.dot} />
          <span className={classes.cardFile}>Button.tsx</span>
        </div>
        <div className={classes.cardBody}>
          <div className={classes.previewRow}>
            <Button size="xs">默认</Button>
            <Button size="xs" variant="filled" color="blue">主要</Button>
            <Button size="xs" variant="light" color="blue">浅色</Button>
            <Button size="xs" variant="outline">描边</Button>
            <Button size="xs" variant="subtle">柔和</Button>
          </div>
          <pre className={classes.code}>
            <code>{`import { Button } from '@react-ui/ui'

function App() {
  return (
    <Button variant="filled" color="blue">
      快速开始
    </Button>
  )
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
