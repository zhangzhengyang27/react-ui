import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineCopy, AiOutlineSend } from 'react-icons/ai';
import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Group,
  Loader,
  ScrollArea,
  Skeleton,
  Text,
  Textarea,
  Title,
  Tooltip,
} from '@xiaoye-react/ui';

import useLocale from '../../../hooks/useLocale';
import ComponentsBlock from '../../../pages/index/components/PreviewPane/Simple';
import { generateThemeCode } from '../../../pages/index/components/ThemePreview/themeCodeUtils';
import type { SiteContextProps } from '../../../theme/slots/SiteContext';
import SiteContext from '../../../theme/slots/SiteContext';
import usePromptRecommend from './usePromptRecommend';
import usePromptTheme from './usePromptTheme';
import classes from './PromptDrawer.module.css';

const reactUiLogoSrc = '/favicon.svg';

const THEME_EMOJIS = ['🌅', '🌊', '🌿', '🍂', '🌸', '🌌', '🎨', '⚡', '🔮', '🪐'];

const getEmojiForTheme = (index: number) => THEME_EMOJIS[index % THEME_EMOJIS.length];

const locales = {
  cn: {
    title: '🎨 AI 生成主题',
    finishTips: '生成主题完成，已应用',
    placeholder: '描述你想要的主题风格，如：温暖阳光、清新自然、科技感...',
    welcomeTitle: 'AI 主题生成器',
    welcomeDescription: '描述你想要的风格，我会为你生成专属主题',
    recommendTitle: '推荐主题',
    loading: '加载中...',
    refresh: '换一换',
    resetToDefault: '恢复默认主题',
    copyTheme: '复制主题代码',
    copied: '已复制',
    cancel: '停止',
  },
  en: {
    title: '🎨 AI Theme Generator',
    finishTips: 'Theme generated and applied',
    placeholder: 'Describe your desired theme style, e.g., warm sunny, fresh natural, tech feel...',
    welcomeTitle: 'AI Theme Generator',
    welcomeDescription: 'Describe your desired style and I will generate a custom theme for you',
    recommendTitle: 'Recommended Themes',
    loading: 'Loading...',
    refresh: 'Refresh',
    resetToDefault: 'Reset to default theme',
    copyTheme: 'Copy theme code',
    copied: 'Copied',
    cancel: 'Stop',
  },
};

export interface PromptDrawerProps {
  open: boolean;
  onClose: () => void;
  onThemeChange?: (themeConfig: SiteContextProps['dynamicTheme']) => void;
}

const PromptDrawer: React.FC<PromptDrawerProps> = ({ open, onClose, onThemeChange }) => {
  const { updateSiteConfig, isDark, dynamicTheme } = React.use(SiteContext) as SiteContextProps;
  const [locale, localeKey] = useLocale(locales);
  const [inputValue, setInputValue] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);

  const [submitPrompt, loading, prompt, resText, cancelRequest, generateErrorMessage] =
    usePromptTheme(onThemeChange);
  const hasGenerateError = generateErrorMessage !== undefined;

  const {
    recommendations,
    loading: recommendLoading,
    fetch: fetchRecommendations,
  } = usePromptRecommend(localeKey);

  const handleScroll = React.useCallback(() => {
    if (!scrollContainerRef.current) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    shouldAutoScrollRef.current = distanceToBottom <= 10;
  }, []);

  const handleSubmit = React.useCallback(
    (value: string) => {
      if (!value.trim()) {
        return;
      }
      shouldAutoScrollRef.current = true;
      requestAnimationFrame(() => {
        scrollContainerRef.current?.scrollTo({
          behavior: 'smooth',
          top: Number.MAX_SAFE_INTEGER,
        });
      });
      submitPrompt(value);
      setInputValue('');
    },
    [submitPrompt],
  );

  const handleRefreshRecommendations = React.useCallback(() => {
    fetchRecommendations(`prompt-drawer-refresh-${Date.now()}`);
  }, [fetchRecommendations]);

  const handleResetToDefaultTheme = () => {
    updateSiteConfig({ dynamicTheme: undefined });
  };

  const handleCopyTheme = React.useCallback(async () => {
    if (!dynamicTheme) {
      return;
    }
    // Pass token only; algorithm reference relies on antd internals that are
    // no longer available after migration, so it is intentionally omitted.
    const themeConfig = { token: dynamicTheme.token } as any;
    const code = generateThemeCode(themeConfig);
    try {
      await navigator.clipboard.writeText(code);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      setCopied(true);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed silently
    }
  }, [dynamicTheme]);

  useEffect(
    () => () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    },
    [],
  );

  // Replace antd Drawer's `afterOpenChange`: fetch recommendations and focus input when opening
  useEffect(() => {
    if (!open) {
      return;
    }
    fetchRecommendations('prompt-drawer-init');
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollContainerRef.current?.scrollTo({
        behavior: 'smooth',
        top: Number.MAX_SAFE_INTEGER,
      });
    }
  }, [resText, prompt, recommendations, loading]);

  const recommendedPrompts = React.useMemo(
    () =>
      recommendations.slice(0, 3).map((text, index) => ({
        key: text,
        description: `${getEmojiForTheme(index)} ${text}`,
        originalDescription: text,
      })),
    [recommendations],
  );

  const handleSendClick = () => {
    if (!inputValue.trim()) {
      return;
    }
    handleSubmit(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const renderWelcome = () => (
    <div className={classes.welcome}>
      <div className={classes.welcomeCard}>
        <img draggable={false} src={reactUiLogoSrc} alt="react-ui" className={classes.welcomeIcon} />
        <div className={classes.welcomeText}>
          <Title order={4}>{locale.welcomeTitle}</Title>
          <Text size="sm" c="dimmed">
            {locale.welcomeDescription}
          </Text>
        </div>
      </div>
    </div>
  );

  const renderPrompts = () => (
    <div className={classes.promptsSection}>
      <Divider label={locale.recommendTitle} labelPosition="center" size="xs" />
      {recommendLoading ? (
        <div className={classes.loadingRow}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} width={140} height={32} radius="md" />
          ))}
        </div>
      ) : (
        recommendedPrompts.length > 0 && (
          <div className={classes.promptsList}>
            {recommendedPrompts.map((item) => (
              <Button
                key={item.key}
                variant="light"
                size="sm"
                radius="md"
                onClick={() => handleSubmit(item.originalDescription)}
              >
                {item.description}
              </Button>
            ))}
            <Button
              variant="subtle"
              size="sm"
              radius="md"
              onClick={handleRefreshRecommendations}
            >
              🔄 {locale.refresh}
            </Button>
          </div>
        )
      )}
    </div>
  );

  const renderChatMessages = () => (
    <div className={classes.messagesList}>
      {/* User message */}
      <div className={`${classes.msgRow} ${classes.msgRowUser}`}>
        <div className={classes.userBubble}>
          <Text size="sm" c="white" style={{ color: '#fff' }}>
            {prompt}
          </Text>
        </div>
      </div>

      {/* AI response */}
      <div className={classes.msgRow}>
        <img draggable={false} src={reactUiLogoSrc} alt="react-ui" className={classes.aiAvatar} />
        <div className={classes.aiContent}>
          {loading && !resText && !hasGenerateError ? (
            <Loader size="sm" />
          ) : (
            <pre className={classes.codeBlock}>
              {hasGenerateError ? generateErrorMessage : resText}
            </pre>
          )}
          {!loading && resText && !hasGenerateError && (
            <div className={classes.aiFooter}>
              <Tooltip label={copied ? locale.copied : locale.copyTheme} position="top">
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={handleCopyTheme}
                  aria-label={copied ? locale.copied : locale.copyTheme}
                >
                  {copied ? <AiOutlineCheck /> : <AiOutlineCopy />}
                </ActionIcon>
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      {/* Finish tip + recommendations */}
      {!loading && resText && !hasGenerateError && (
        <>
          <div className={classes.systemBubble}>
            <Text size="xs" style={{ color: '#fff' }}>
              {locale.finishTips}
            </Text>
          </div>
          {recommendLoading ? (
            <div className={classes.loadingRow}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} width={140} height={32} radius="md" />
              ))}
            </div>
          ) : (
            recommendations.length > 0 && (
              <div className={classes.recommendList}>
                {recommendations.slice(0, 4).map((text, index) => (
                  <Button
                    key={text}
                    variant="light"
                    size="sm"
                    radius="md"
                    onClick={() => handleSubmit(text)}
                  >
                    {getEmojiForTheme(index)} {text}
                  </Button>
                ))}
                <Button
                  variant="subtle"
                  size="sm"
                  radius="md"
                  onClick={handleRefreshRecommendations}
                >
                  🔄 {locale.refresh}
                </Button>
              </div>
            )
          )}
        </>
      )}
    </div>
  );

  const drawerTitle = (
    <Group justify="space-between" align="center" wrap="nowrap">
      <Text fw={600}>{locale.title}</Text>
      <Button variant="subtle" size="xs" onClick={handleResetToDefaultTheme}>
        {locale.resetToDefault}
      </Button>
    </Group>
  );

  return (
    <Drawer
      opened={open}
      onClose={onClose}
      title={drawerTitle}
      position="right"
      withCloseButton
      style={{ '--drawer-size': '80vw' } as React.CSSProperties}
    >
      <div className={classes.root} data-dark={isDark ? 'true' : 'false'}>
        <div className={classes.drawerBody}>
          {/* Left: theme preview */}
          <div className={classes.previewPane}>
            <ComponentsBlock className="prompt-drawer-preview" inherit />
          </div>

          {/* Right: chat area */}
          <div className={classes.chatPane}>
            <ScrollArea
              className={classes.messagesArea}
              viewportRef={scrollContainerRef}
              viewportProps={{ onScroll: handleScroll }}
              scrollbars="y"
            >
              {!prompt ? (
                <>
                  {renderWelcome()}
                  {renderPrompts()}
                </>
              ) : (
                renderChatMessages()
              )}
            </ScrollArea>

            <div className={classes.inputArea}>
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={locale.placeholder}
                minRows={1}
                maxRows={4}
                className={classes.textarea}
              />
              {loading ? (
                <Button
                  variant="light"
                  color="red"
                  onClick={cancelRequest}
                  className={classes.sendButton}
                  aria-label={locale.cancel}
                >
                  <AiOutlineClose />
                </Button>
              ) : (
                <Button
                  onClick={handleSendClick}
                  disabled={!inputValue.trim()}
                  className={classes.sendButton}
                  aria-label={locale.placeholder}
                >
                  <AiOutlineSend />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default PromptDrawer;
