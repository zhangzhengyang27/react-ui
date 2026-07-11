import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { Button, Container, Overlay, Text, Title } from '@react-ui/ui';
import banner from './banner.webp';
import classes from './HomePageUI.module.css';

export function HomePageUI() {
  return (
    <div className={classes.wrapper}>
      <Container size={1440} className={classes.container}>
        <div className={classes.image} style={{ backgroundImage: `url(${banner.src})` }} />
        <Overlay className={classes.overlay} opacity={1} zIndex={1} />

        <div className={classes.body}>
          <Text className={classes.supTitle}>使用 ReactUI 更高效地构建</Text>
          <Title className={classes.title}>
            <span className={classes.highlight}>120+ 响应式组件</span>
            <br /> 基于 ReactUI 构建
          </Title>

          <Text className={classes.description}>
            使用预制的响应式组件更快地构建你的下一个网站，这些组件由 ReactUI 维护者和社区设计与构建。
            所有组件对所有人永久免费。
          </Text>

          <div className={classes.controls}>
            <Button
              className={classes.control}
              variant="gradient"
              radius="md"
              size="lg"
              component="a"
              href="https://react-ui.dev/"
              rightSection={<ArrowUpRightIcon />}
              justify="space-between"
              miw={300}
            >
              浏览组件
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
