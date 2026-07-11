import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore';
import { HomePageTabs } from '../shared/HomePageTabs/HomePageTabs';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import { HomePageInputsDemo } from './demos/HomePageInputsDemo';
import { HomePageNavigationDemo } from './demos/HomePageNavigationDemo';
import { HomePageOverlaysDemo } from './demos/HomePageOverlaysDemo';
import classes from './HomePageComponents.module.css';

export function HomePageComponents() {
  return (
    <section className={classes.root}>
      <HomePageContainer>
        <HomePageTitle order={2}>120+ 组件</HomePageTitle>

        <HomePageDescription className={classes.description}>
          使用高质量、经过充分测试的组件更快地构建应用。ReactUI 包含创建复杂 Web 应用所需的一切：
          自定义选择器、日期选择器、通知、模态框等。
        </HomePageDescription>

        <HomePageTabs
          data={[
            { label: '输入', value: 'inputs', content: <HomePageInputsDemo /> },
            { label: '浮层', value: 'overlays', content: <HomePageOverlaysDemo /> },
            { label: '导航', value: 'navigation', content: <HomePageNavigationDemo /> },
          ]}
        />

        <HomePageLearnMore href="/core/package">查看全部组件</HomePageLearnMore>
      </HomePageContainer>
    </section>
  );
}
