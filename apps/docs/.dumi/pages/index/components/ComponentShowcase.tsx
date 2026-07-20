import React, { useState } from 'react';
import {
  AiOutlineAppstore,
  AiOutlineBulb,
  AiOutlineCheckCircle,
  AiOutlineEdit,
} from 'react-icons/ai';
import {
  Badge,
  Button,
  Chip,
  Group,
  Modal,
  Progress,
  RingProgress,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';

import useLocale from '../../../hooks/useLocale';
import GroupSection from './Group';
import ReactUIDemoWrapper from './ReactUIDemoWrapper';

import classes from './ComponentShowcase.module.css';

const locales = {
  cn: {
    title: '组件一览',
    desc: '真实渲染 @react-ui/ui 组件，所见即所得。',
    tabs: {
      button: '按钮',
      input: '输入',
      feedback: '反馈',
      overlay: '浮层',
    },
  },
  en: {
    title: 'Components Showcase',
    desc: 'Real @react-ui/ui components rendered directly.',
    tabs: {
      button: 'Button',
      input: 'Input',
      feedback: 'Feedback',
      overlay: 'Overlay',
    },
  },
};

const buttonCode = `import { Button, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Group>
      <Button variant="filled">Filled</Button>
      <Button variant="light">Light</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
    </Group>
  );
}`;

const ButtonPreview: React.FC = () => (
  <ReactUIDemoWrapper>
    <Group>
      <Button variant="filled">Filled</Button>
      <Button variant="light">Light</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
    </Group>
  </ReactUIDemoWrapper>
);

const inputCode = `import { TextInput, Switch, Chip, Stack } from '@react-ui/ui';

function Demo() {
  return (
    <Stack w={280}>
      <TextInput label="邮箱" placeholder="your@email.com" />
      <Switch label="启用通知" defaultChecked />
      <Chip defaultChecked>React</Chip>
    </Stack>
  );
}`;

const InputPreview: React.FC = () => (
  <ReactUIDemoWrapper>
    <Stack w={280}>
      <TextInput label="邮箱" placeholder="your@email.com" />
      <Switch label="启用通知" defaultChecked />
      <Chip defaultChecked>React</Chip>
    </Stack>
  </ReactUIDemoWrapper>
);

const feedbackCode = `import { Progress, RingProgress, Badge, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Group align="center">
      <Progress value={65} w={200} />
      <RingProgress
        sections={[
          { value: 40, color: 'cyan' },
          { value: 15, color: 'orange' },
          { value: 15, color: 'grape' },
        ]}
      />
      <Badge color="green">新功能</Badge>
    </Group>
  );
}`;

const FeedbackPreview: React.FC = () => (
  <ReactUIDemoWrapper>
    <Group align="center">
      <Progress value={65} w={200} />
      <RingProgress
        sections={[
          { value: 40, color: 'cyan' },
          { value: 15, color: 'orange' },
          { value: 15, color: 'grape' },
        ]}
      />
      <Badge color="green">新功能</Badge>
    </Group>
  </ReactUIDemoWrapper>
);

const overlayCode = `import { Button, Modal, Text } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';

function Demo() {
  const [opened, handlers] = useDisclosure(false);
  return (
    <>
      <Button onClick={handlers.open}>打开 Modal</Button>
      <Modal opened={opened} onClose={handlers.close} title="提示">
        <Text>欢迎使用 react-ui！</Text>
      </Modal>
    </>
  );
}`;

const OverlayPreview: React.FC = () => {
  const [opened, handlers] = useDisclosure(false);
  return (
    <ReactUIDemoWrapper>
      <>
        <Button onClick={handlers.open}>打开 Modal</Button>
        <Modal opened={opened} onClose={handlers.close} title="提示">
          <Text>欢迎使用 react-ui！</Text>
        </Modal>
      </>
    </ReactUIDemoWrapper>
  );
};

const demos: Record<string, { icon: React.ReactNode; code: string; preview: React.FC }> = {
  button: {
    icon: <AiOutlineAppstore />,
    code: buttonCode,
    preview: ButtonPreview,
  },
  input: {
    icon: <AiOutlineEdit />,
    code: inputCode,
    preview: InputPreview,
  },
  feedback: {
    icon: <AiOutlineCheckCircle />,
    code: feedbackCode,
    preview: FeedbackPreview,
  },
  overlay: {
    icon: <AiOutlineBulb />,
    code: overlayCode,
    preview: OverlayPreview,
  },
};

const ComponentShowcase: React.FC = () => {
  const [locale] = useLocale(locales);
  const [activeTab, setActiveTab] = useState('button');

  const tabOptions = [
    { value: 'button', label: locale.tabs.button, icon: demos.button.icon },
    { value: 'input', label: locale.tabs.input, icon: demos.input.icon },
    { value: 'feedback', label: locale.tabs.feedback, icon: demos.feedback.icon },
    { value: 'overlay', label: locale.tabs.overlay, icon: demos.overlay.icon },
  ];

  const current = demos[activeTab];
  const Preview = current.preview;

  return (
    <GroupSection title={locale.title} description={locale.desc} id="components" collapse>
      <div className={classes.container}>
        <div className={classes.tabs}>
          <SegmentedControl
            data={tabOptions.map((t) => ({
              value: t.value,
              label: (
                <span className={classes.tabLabel}>
                  {t.icon}
                  <span>{t.label}</span>
                </span>
              ),
            }))}
            value={activeTab}
            onChange={(value) => setActiveTab(value)}
          />
        </div>
        <div className={classes.grid}>
          <div className={classes.codePanel}>
            <Text component="p" className={classes.panelLabel}>
              Code
            </Text>
            <pre className={classes.code}>{current.code}</pre>
          </div>
          <div className={classes.previewPanel}>
            <Preview />
          </div>
        </div>
      </div>
    </GroupSection>
  );
};

export default ComponentShowcase;
