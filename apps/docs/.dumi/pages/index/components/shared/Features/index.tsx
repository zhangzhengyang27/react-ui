import { Text, ThemeIcon } from '@xiaoye-react/ui';
import classes from './HomePageFeature.module.css';

interface HomePageFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export type HomePageFeaturesData = HomePageFeatureProps[];

function HomePageFeature({ icon, title, description }: HomePageFeatureProps) {
  return (
    <section className={classes.feature}>
      <ThemeIcon className={classes.featureIcon} size={50} radius="md">
        {icon}
      </ThemeIcon>
      <div>
        <Text component="h3" className={classes.featureTitle}>
          {title}
        </Text>
        <Text className={classes.featureDescription}>{description}</Text>
      </div>
    </section>
  );
}

interface HomePageFeaturesProps {
  data: HomePageFeaturesData;
}

export function HomePageFeatures({ data }: HomePageFeaturesProps) {
  const items = data.map((feature, index) => <HomePageFeature key={index} {...feature} />);
  return <div className={classes.features}>{items}</div>;
}
