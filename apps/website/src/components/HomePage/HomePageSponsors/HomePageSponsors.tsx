import { Image, Text } from '@react-ui/ui';
import { meta } from '@react-ui/meta';
import rawData from '../../../.docgen/sponsors.json';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import classes from './HomePageSponsors.module.css';

export function HomePageSponsors() {
  const data = (rawData as any).sponsors || [];
  const items = data.map((item: any) => (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${item.name} 赞助了 ReactUI`}
      className={classes.sponsor}
      key={item.name}
    >
      <Image src={item.image} className={classes.image} alt={item.name} loading="lazy" />
      <span className={classes.name}>{item.name}</span>
    </a>
  ));

  return (
    <HomePageContainer className={classes.inner}>
      <Text className={classes.title}>赞助者</Text>
      <div className={classes.sponsors}>
        {items}
        <a
          href={meta.gitHubLinks.reactui}
          target="_blank"
          rel="noreferrer"
          aria-label="赞助 ReactUI"
          className={classes.sponsor}
        >
          <span className={classes.name}>You? ❤️</span>
          <div className={classes.description}>
            赞助 ReactUI，支持项目持续发展
          </div>
        </a>
      </div>
    </HomePageContainer>
  );
}
