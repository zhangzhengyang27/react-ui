import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import { Anchor, Avatar, Group, SimpleGrid, Text } from '@react-ui/ui';
import { meta } from '@react-ui/mantine-meta';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import { ReviewData, reviews } from './reviews-data';
import classes from './HomePageCommunity.module.css';

interface ReviewProps {
  data: ReviewData;
}

function Review({ data }: ReviewProps) {
  return (
    <article className={classes.review}>
      <div className={classes.reviewHeader}>
        <Group gap="sm">
          <Avatar src={data.author.avatar} alt={data.author.nickname} size={30} />
          <Text
            component="a"
            href={`https://github.com/${data.author.nickname}`}
            className={classes.reviewAuthor}
          >
            @{data.author.nickname}
          </Text>
        </Group>

        <Anchor className={classes.reviewExternalLink} href={data.link} target="_blank">
          <span>Open on GitHub</span>
          <ArrowSquareOutIcon size={16} />
        </Anchor>
      </div>

      <Text component="a" href={data.link} target="_blank" className={classes.reviewTitle}>
        {data.title}
      </Text>

      <div className={classes.reviewBody} dangerouslySetInnerHTML={{ __html: data.body }} />
    </article>
  );
}

interface StatProps {
  label: string;
  value: string;
  link: string;
}

function Stat({ label, value, link }: StatProps) {
  return (
    <a href={link} target="_blank" className={classes.stat} rel="noreferrer">
      <Text className={classes.statValue}>{value}</Text>
      <Text className={classes.statLabel}>{label}</Text>
    </a>
  );
}

export function HomePageCommunity() {
  const items = reviews.map((data, index) => <Review key={index} data={data} />);

  return (
    <section className={classes.root}>
      <HomePageContainer className={classes.container}>
        <SimpleGrid cols={{ md: 2 }} spacing={60}>
          <div>
            <div className={classes.primaryColumn}>
              <HomePageTitle order={2}>深受开发者信赖的组件库</HomePageTitle>
              <HomePageDescription>
                ReactUI 在开源社区中构建，由使用它的开发者共同塑造。
                提供 120+ 组件和 30+ Hooks，覆盖大部分 UI 开发需求。
              </HomePageDescription>

              <HomePageLearnMore href={meta.gitHubLinks.discussions}>
                在 GitHub 上查看讨论
              </HomePageLearnMore>

              <div className={classes.stats}>
                <Stat value="120+" label="组件" link={meta.gitHubLinks.reactui} />
                <Stat
                  value="30+"
                  label="Hooks"
                  link="https://www.npmjs.com/package/@react-ui/hooks"
                />
                <Stat value="MIT" label="开源协议" link={meta.gitHubLinks.reactui} />
              </div>
            </div>
          </div>

          <div className={classes.secondaryColumn}>{items}</div>
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
