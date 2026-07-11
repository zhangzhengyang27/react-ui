import { ArrowUpRightIcon } from '@phosphor-icons/react';
import cx from 'clsx';
import { Box, SimpleGrid, SimpleGridProps } from '@react-ui/ui';
import { GithubIcon } from '@react-ui/dev-icons';
import { ReactUILogo } from '@react-ui/mantine-logo';
import { meta } from '@react-ui/mantine-meta';
import classes from './SocialCards.module.css';

interface CardBaseProps extends React.ComponentProps<'a'> {
  icon: 'github' | 'reactui';
  title: string;
  description: string;
  href: string;
}

const icons: Record<CardBaseProps['icon'], React.ReactNode> = {
  github: <GithubIcon size={30} className={classes.icon} />,
  reactui: (
    <div className={classes.icon}>
      <ReactUILogo size={50} type="mark" />
    </div>
  ),
};

export function CardBase({ icon, title, description, className, ...others }: CardBaseProps) {
  return (
    <a className={cx(classes.card, className)} target="_blank" rel="noreferrer" {...others}>
      {icons[icon]}
      <ArrowUpRightIcon size={20} className={classes.arrow} />
      <div className={classes.body}>
        <div className={classes.title}>{title}</div>
        <div className={classes.description}>{description}</div>
      </div>
    </a>
  );
}

export function GitHubCard() {
  return (
    <CardBase
      icon="github"
      className={classes.github}
      href={meta.gitHubLinks.discussions}
      title="Start a discussion"
      description="Request new features, ask questions and provide feedback with GitHub discussions"
    />
  );
}

export function DocsCard() {
  return (
    <CardBase
      icon="reactui"
      className={classes.hc}
      href={meta.gitHubLinks.reactui}
      title="ReactUI on GitHub"
      description="Explore the source code, star the project and contribute"
    />
  );
}

interface SocialCardsProps {
  github?: boolean;
  docs?: boolean;
  cols?: SimpleGridProps['cols'];
}

export function SocialCards({
  github = true,
  docs = true,
  cols = { md: 2 },
}: SocialCardsProps) {
  return (
    <SimpleGrid cols={cols} spacing="lg">
      {github && <GitHubCard />}
      {docs && <DocsCard />}
    </SimpleGrid>
  );
}
