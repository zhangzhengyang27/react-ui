import dayjs from 'dayjs';
import { ScheduleEventData } from '@xiaoye-react/ui';

const startOfWeek = dayjs('2024-01-15')
  .subtract((dayjs('2024-01-15').day() + 6) % 7, 'day')
  .format('YYYY-MM-DD');
const dayAfterStartOfWeek = dayjs(startOfWeek).add(1, 'day').format('YYYY-MM-DD');
const dayAfterDayAfterStartOfWeek = dayjs(startOfWeek).add(2, 'day').format('YYYY-MM-DD');

export const regularEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '早间站会',
    start: `${startOfWeek} 09:00:00`,
    end: `${startOfWeek} 09:30:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '团队会议',
    start: `${startOfWeek} 10:00:00`,
    end: `${startOfWeek} 11:30:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '午餐休息',
    start: `${startOfWeek} 12:00:00`,
    end: `${startOfWeek} 13:00:00`,
    color: 'orange',
  },
  {
    id: 4,
    title: '代码审查',
    start: `${dayAfterStartOfWeek} 14:00:00`,
    end: `${dayAfterStartOfWeek} 15:00:00`,
    color: 'violet',
  },
  {
    id: 5,
    title: '客户电话',
    start: `${dayAfterStartOfWeek} 15:30:00`,
    end: `${dayAfterStartOfWeek} 16:30:00`,
    color: 'cyan',
  },
  {
    id: 6,
    title: '项目规划',
    start: `${dayAfterDayAfterStartOfWeek} 10:00:00`,
    end: `${dayAfterDayAfterStartOfWeek} 12:00:00`,
    color: 'pink',
  },
  {
    id: 7,
    title: '全天会议',
    start: `${startOfWeek} 00:00:00`,
    end: dayjs(startOfWeek).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
];

export const overlappingEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '研讨会场次 1',
    start: `${startOfWeek} 10:00:00`,
    end: `${startOfWeek} 11:30:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '研讨会场次 2',
    start: `${startOfWeek} 11:00:00`,
    end: `${startOfWeek} 12:30:00`,
    color: 'violet',
  },
  {
    id: 3,
    title: '研讨会场次 3',
    start: `${startOfWeek} 11:30:00`,
    end: `${startOfWeek} 13:00:00`,
    color: 'cyan',
  },
  {
    id: 4,
    title: '明天事件 1',
    start: `${dayAfterStartOfWeek} 09:00:00`,
    end: `${dayAfterStartOfWeek} 10:30:00`,
    color: 'green',
  },
  {
    id: 5,
    title: '明天事件 2',
    start: `${dayAfterStartOfWeek} 09:30:00`,
    end: `${dayAfterStartOfWeek} 11:00:00`,
    color: 'orange',
  },
];

export const businessEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '清晨会议',
    start: `${startOfWeek} 08:30:00`,
    end: `${startOfWeek} 09:00:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '工作时间任务 1',
    start: `${startOfWeek} 10:00:00`,
    end: `${startOfWeek} 11:00:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '工作时间任务 2',
    start: `${dayAfterStartOfWeek} 14:00:00`,
    end: `${dayAfterStartOfWeek} 15:00:00`,
    color: 'violet',
  },
  {
    id: 4,
    title: '晚间同步',
    start: `${dayAfterStartOfWeek} 17:30:00`,
    end: `${dayAfterStartOfWeek} 18:00:00`,
    color: 'orange',
  },
];

export const dataCode = `
import dayjs from 'dayjs';

const startOfWeek = dayjs('2024-01-15').subtract((dayjs('2024-01-15').day() + 6) % 7, 'day').format('YYYY-MM-DD');
const dayAfterStartOfWeek = dayjs(startOfWeek).add(1, 'day').format('YYYY-MM-DD');

const events = [
  {
    id: 1,
    title: '早间站会',
    start: \`\${startOfWeek} 09:00:00\`,
    end: \`\${startOfWeek} 09:30:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '团队会议',
    start: \`\${startOfWeek} 10:00:00\`,
    end: \`\${startOfWeek} 11:30:00\`,
    color: 'green',
  },
  {
    id: 3,
    title: '代码审查',
    start: \`\${dayAfterStartOfWeek} 14:00:00\`,
    end: \`\${dayAfterStartOfWeek} 15:00:00\`,
    color: 'violet',
  },
  {
    id: 4,
    title: '全天会议',
    start: \`\${startOfWeek} 00:00:00\`,
    end: dayjs(startOfWeek).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
];
`;
