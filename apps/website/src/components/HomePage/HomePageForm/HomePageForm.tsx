import { BalloonIcon, GaugeIcon, PuzzlePieceIcon, RocketLaunchIcon } from '@phosphor-icons/react';
import { SimpleGrid } from '@react-ui/ui';
import { Demo } from '@react-ui/demo';
import { FormDemos } from '@react-ui/docs-demos';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import {
  HomePageFeatures,
  HomePageFeaturesData,
} from '../shared/HomePageFeatures/HomePageFeatures';
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import classes from './HomePageForm.module.css';

const features: HomePageFeaturesData = [
  {
    icon: PuzzlePieceIcon,
    title: '无缝集成',
    description: 'useForm Hook 与所有 ReactUI 输入组件开箱即用',
  },
  {
    icon: GaugeIcon,
    title: '出色性能',
    description:
      'useForm 仅在验证和状态变化时重新渲染，通常每个表单生命周期只渲染 2-3 次',
  },
  {
    icon: BalloonIcon,
    title: '轻量级',
    description: '6.3kb 压缩后 + Gzip，除 React 外无其他依赖',
  },
  {
    icon: RocketLaunchIcon,
    title: '功能完备',
    description:
      'useForm 支持列表和嵌套对象、多种验证方式（包括基于 Zod 的 schema 验证），以及便捷的值更新订阅管理',
  },
];

export function HomePageForm() {
  return (
    <section className={classes.root}>
      <HomePageContainer>
        <SimpleGrid cols={{ md: 2 }} spacing={50} verticalSpacing={30}>
          <div className={classes.column} data-primary>
            <div className={classes.main}>
              <HomePageTitle order={2}>表单库</HomePageTitle>
              <HomePageDescription className={classes.description}>
                @react-ui/form — 专为 ReactUI 组件设计的高性能表单库，与所有 ReactUI 输入组件
                开箱即用。
              </HomePageDescription>
              <HomePageLearnMore href="/form/package">探索全部表单功能</HomePageLearnMore>

              <HomePageFeatures data={features} />
            </div>
          </div>
          <div className={classes.column}>
            <Demo data={FormDemos.usage} />
          </div>
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
