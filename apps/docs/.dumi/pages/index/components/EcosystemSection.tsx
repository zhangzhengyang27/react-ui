import React from 'react';
import {
  AiOutlineAppstore,
  AiOutlineCalendar,
  AiOutlineFileText,
  AiOutlineForm,
  AiOutlinePieChart,
  AiOutlineThunderbolt,
} from 'react-icons/ai';
import { Card, Text, Title } from '@react-ui/ui';
import { useLocation } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import Link from '../../../theme/common/Link';
import * as utils from '../../../theme/utils';
import Group from './Group';

import classes from './EcosystemSection.module.css';

const locales = {
  cn: {
    title: '探索生态',
    desc: '从组件到业务模块，从状态管理到图表，找到适合你的解决方案。',
    items: [
      {
        key: 'components',
        icon: <AiOutlineAppstore />,
        title: '组件库',
        desc: '60+ 原子与复合组件，覆盖表单、数据展示、反馈、导航等场景。',
        path: '/components/overview/',
      },
      {
        key: 'hooks',
        icon: <AiOutlineThunderbolt />,
        title: 'Hooks',
        desc: 'use-form、use-list-state、use-disclosure 等状态与 DOM 工具 hook。',
        path: '/docs/hooks/package/',
      },
      {
        key: 'charts',
        icon: <AiOutlinePieChart />,
        title: 'Charts',
        desc: 'AreaChart、BarChart、LineChart、DonutChart 等基于 recharts 的图表组件。',
        path: '/docs/charts/getting-started/',
      },
      {
        key: 'dates',
        icon: <AiOutlineCalendar />,
        title: 'Dates',
        desc: 'DatePicker、Calendar、TimeInput 等日期时间组件与工具函数。',
        path: '/docs/dates/getting-started/',
      },
      {
        key: 'schedule',
        icon: <AiOutlineFileText />,
        title: 'Schedule',
        desc: 'DayView、AgendaView 等日程视图组件，支持拖拽与多时区。',
        path: '/docs/schedule/getting-started/',
      },
      {
        key: 'form',
        icon: <AiOutlineForm />,
        title: 'Form',
        desc: 'Schema 校验、嵌套表单、Field 组件，快速搭建复杂表单。',
        path: '/docs/form/package/',
      },
    ],
  },
  en: {
    title: 'Explore Ecosystem',
    desc: 'From components to business modules, from state management to charts.',
    items: [
      {
        key: 'components',
        icon: <AiOutlineAppstore />,
        title: 'Components',
        desc: '60+ atomic and composite components for forms, data display, feedback, navigation.',
        path: '/components/overview/',
      },
      {
        key: 'hooks',
        icon: <AiOutlineThunderbolt />,
        title: 'Hooks',
        desc: 'use-form, use-list-state, use-disclosure and more utilities.',
        path: '/docs/hooks/package/',
      },
      {
        key: 'charts',
        icon: <AiOutlinePieChart />,
        title: 'Charts',
        desc: 'AreaChart, BarChart, LineChart, DonutChart based on recharts.',
        path: '/docs/charts/getting-started/',
      },
      {
        key: 'dates',
        icon: <AiOutlineCalendar />,
        title: 'Dates',
        desc: 'DatePicker, Calendar, TimeInput and date-time utilities.',
        path: '/docs/dates/getting-started/',
      },
      {
        key: 'schedule',
        icon: <AiOutlineFileText />,
        title: 'Schedule',
        desc: 'DayView, AgendaView with drag-drop and multi-timezone support.',
        path: '/docs/schedule/getting-started/',
      },
      {
        key: 'form',
        icon: <AiOutlineForm />,
        title: 'Form',
        desc: 'Schema validation, nested forms, Field components for complex forms.',
        path: '/docs/form/package/',
      },
    ],
  },
};

const EcosystemSection: React.FC = () => {
  const [locale] = useLocale(locales);
  const { pathname, search } = useLocation();
  const isZhCN = utils.isZhCN(pathname);

  return (
    <Group title={locale.title} description={locale.desc} id="ecosystem">
      <div className={classes.grid}>
        {locale.items.map((item) => (
          <Link
            key={item.key}
            to={utils.getLocalizedPathname(item.path, isZhCN, search)}
            className={classes.link}
          >
            <Card className={classes.card} padding="lg" withBorder>
              <span className={classes.icon}>{item.icon}</span>
              <Title order={5} className={classes.cardTitle}>
                {item.title}
              </Title>
              <Text component="p" c="dimmed" size="sm">
                {item.desc}
              </Text>
            </Card>
          </Link>
        ))}
      </div>
    </Group>
  );
};

export default EcosystemSection;
