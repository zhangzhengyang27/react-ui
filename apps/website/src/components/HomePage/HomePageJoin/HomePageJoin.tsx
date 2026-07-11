import { SimpleGrid, Stack } from '@react-ui/ui';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import { GitHubCard, DocsCard } from './SocialCards';
import classes from './HomePageJoin.module.css';

export function HomePageJoin() {
  return (
    <section className={classes.root}>
      <HomePageContainer>
        <HomePageTitle order={2}>加入社区</HomePageTitle>

        <HomePageDescription className={classes.description}>
          ReactUI 是一个开源项目，欢迎开发者参与贡献。在 GitHub 上提交 issue、参与讨论、
          分享你的使用经验，帮助项目不断成长。
        </HomePageDescription>

        <div className={classes.cards}>
          <SimpleGrid cols={{ md: 2 }} spacing={10}>
            <DocsCard />
            <Stack gap={10}>
              <GitHubCard />
            </Stack>
          </SimpleGrid>
        </div>
      </HomePageContainer>
    </section>
  );
}
