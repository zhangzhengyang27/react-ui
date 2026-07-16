import { ArrowUpRightIcon } from '@phosphor-icons/react';
import cx from 'clsx';
import { Box, SimpleGrid, SimpleGridProps } from '@react-ui/ui';
import { GithubIcon } from '@react-ui/dev-icons';
import { ReactUILogo } from '@react-ui/logo';
import { meta } from '@react-ui/meta';
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
      title="发起讨论"
      description="通过 GitHub Discussions 提出新功能、提问或提供反馈"
    />
  );
}

export function DocsCard() {
  return (
    <CardBase
      icon="reactui"
      className={classes.hc}
      href={meta.gitHubLinks.reactui}
      title="GitHub 上的 ReactUI"
      description="浏览源代码、为项目点赞并参与贡献"
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
