import { useState } from 'react';
import { CheckIcon, CopyIcon, LightbulbFilamentIcon, RobotIcon } from '@phosphor-icons/react';
import { ActionIcon, Affix, Card, Stack, Text, Tooltip } from '@react-ui/ui';
import { notifications } from '@react-ui/ui';
import { Frontmatter } from '@/types';
import classes from './MdxLlmAffix.module.css';

interface MdxLlmAffixProps {
  meta: Frontmatter;
}

function getLlmUrl(slug: string) {
  return `/llms/${slug.slice(1).replace(/\//g, '-')}.md`;
}

export function MdxLlmAffix({ meta }: MdxLlmAffixProps) {
  const [copied, setCopied] = useState(false);
  const llmUrl = getLlmUrl(meta.slug);

  const handleCopy = async () => {
    try {
      const response = await fetch(llmUrl);
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      notifications.show({
        title: '复制失败',
        message: '无法复制大语言模型文档内容，详情请查看控制台',
        color: 'red',
      });
    }
  };

  return (
    <Affix position={{ bottom: 20, right: 20 }} visibleFrom="sm">
      <Card className={classes.root}>
        <Text className={classes.title}>大语言模型</Text>

        <Stack gap={4}>
          <Tooltip
            label="打开大语言模型优化文档 ↗"
            position="left"
            transitionProps={{ duration: 0 }}
          >
            <ActionIcon
              component="a"
              href={llmUrl}
              target="_blank"
              variant="default"
              size={44}
              className={classes.control}
            >
              <RobotIcon size={22} className={classes.icon} data-color="red" />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={copied ? '已复制！' : '复制大语言模型优化文档'}
            position="left"
            transitionProps={{ duration: 0 }}
          >
            <ActionIcon
              variant="default"
              size={44}
              className={classes.control}
              onClick={handleCopy}
            >
              {copied ? (
                <CheckIcon size={22} className={classes.icon} data-color="teal" />
              ) : (
                <CopyIcon size={22} className={classes.icon} data-color="cyan" />
              )}
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label="提交大语言模型文档反馈 ↗"
            position="left"
            transitionProps={{ duration: 0 }}
          >
            <ActionIcon
              component="a"
              href="https://github.com/react-ui-org/react-ui/discussions/new?category=ai-and-llm-usage-feedback"
              target="_blank"
              rel="noopener noreferrer"
              variant="default"
              size={44}
              className={classes.control}
            >
              <LightbulbFilamentIcon size={22} className={classes.icon} data-color="yellow" />
            </ActionIcon>
          </Tooltip>
        </Stack>
      </Card>
    </Affix>
  );
}
