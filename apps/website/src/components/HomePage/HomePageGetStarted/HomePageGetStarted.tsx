import { FrameworksGuides } from '@/components/FrameworksGuides';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import classes from './HomePageGetStarted.module.css';

export function HomePageGetStarted() {
  return (
    <section className={classes.root}>
      <HomePageContainer>
        <HomePageTitle order={2}>准备好开始了吗？</HomePageTitle>

        <HomePageDescription className={classes.description}>
          ReactUI 可与任何现代 React 框架或构建工具配合使用：按照安装指南，只需几分钟即可在
          Next.js、Vite、React Router 等工具中开始使用，或使用现有模板之一。
        </HomePageDescription>

        <HomePageLearnMore href="/">不使用框架开始</HomePageLearnMore>

        <div className={classes.guides} data-dimmed>
          <FrameworksGuides />
        </div>
      </HomePageContainer>
    </section>
  );
}
