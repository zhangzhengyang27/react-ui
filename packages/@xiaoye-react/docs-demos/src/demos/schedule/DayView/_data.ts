import dayjs from 'dayjs';
import { ScheduleEventData } from '@xiaoye-react/ui';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

export const regularEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '早间站会',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '团队会议',
    start: `${today} 10:00:00`,
    end: `${today} 11:30:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '午餐休息',
    start: `${today} 12:00:00`,
    end: `${today} 13:00:00`,
    color: 'orange',
  },
  {
    id: 4,
    title: '代码审查',
    start: `${today} 14:00:00`,
    end: `${today} 15:00:00`,
    color: 'violet',
  },
  {
    id: 5,
    title: '客户电话',
    start: `${today} 15:30:00`,
    end: `${today} 16:30:00`,
    color: 'cyan',
  },
  {
    id: 6,
    title: '全天会议',
    start: `${today} 00:00:00`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
];

export const overlappingEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '研讨会场次 1',
    start: `${today} 10:00:00`,
    end: `${today} 11:30:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '研讨会场次 2',
    start: `${today} 11:00:00`,
    end: `${today} 12:30:00`,
    color: 'violet',
  },
  {
    id: 3,
    title: '研讨会场次 3',
    start: `${today} 11:30:00`,
    end: `${today} 13:00:00`,
    color: 'cyan',
  },
  {
    id: 4,
    title: 'Full Day Session',
    start: `${today} 10:00:00`,
    end: `${today} 16:00:00`,
    color: 'green',
  },
];

export const allDayEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '会议日',
    start: `${today} 00:00:00`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
  {
    id: 2,
    title: '假日',
    start: `${today} 00:00:00`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'pink',
  },
  {
    id: 3,
    title: '团队建设',
    start: `${today} 00:00:00`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'orange',
  },
  {
    id: 4,
    title: 'Product Launch',
    start: `${today} 00:00:00`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'green',
  },
  {
    id: 5,
    title: 'Year Kickoff',
    start: `${today} 00:00:00`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'blue',
  },
];

export const businessEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '清晨会议',
    start: `${today} 08:30:00`,
    end: `${today} 09:00:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '工作时间任务 1',
    start: `${today} 10:00:00`,
    end: `${today} 11:00:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '工作时间任务 2',
    start: `${today} 14:00:00`,
    end: `${today} 15:00:00`,
    color: 'violet',
  },
  {
    id: 4,
    title: '晚间同步',
    start: `${today} 17:30:00`,
    end: `${today} 18:00:00`,
    color: 'orange',
  },
];

export const dataCode = `
import dayjs from 'dayjs';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events = [
  {
    id: 1,
    title: '早间站会',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 09:30:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '团队会议',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:30:00\`,
    color: 'green',
  },
  {
    id: 3,
    title: '午餐休息',
    start: \`\${today} 12:00:00\`,
    end: \`\${today} 13:00:00\`,
    color: 'orange',
  },
  {
    id: 4,
    title: '代码审查',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 15:00:00\`,
    color: 'violet',
  },
  {
    id: 5,
    title: '客户电话',
    start: \`\${today} 15:30:00\`,
    end: \`\${today} 16:30:00\`,
    color: 'cyan',
  },
  {
    id: 6,
    title: '全天会议',
    start: \`\${today} 00:00:00\`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
];
`;

export const overlappingEventsCode = `
import dayjs from 'dayjs';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events = [
  {
    id: 1,
    title: '研讨会场次 1',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:30:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '研讨会场次 2',
    start: \`\${today} 11:00:00\`,
    end: \`\${today} 12:30:00\`,
    color: 'violet',
  },
  {
    id: 3,
    title: '研讨会场次 3',
    start: \`\${today} 11:30:00\`,
    end: \`\${today} 13:00:00\`,
    color: 'cyan',
  },
  {
    id: 4,
    title: 'Full Day Session',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 16:00:00\`,
    color: 'green',
  },
];
`;

export const allDayEventsCode = `
import dayjs from 'dayjs';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events = [
  {
    id: 1,
    title: '会议日',
    start: \`\${today} 00:00:00\`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
  {
    id: 2,
    title: '假日',
    start: \`\${today} 00:00:00\`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'pink',
  },
  {
    id: 3,
    title: '团队建设',
    start: \`\${today} 00:00:00\`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'orange',
  },
  {
    id: 4,
    title: 'Product Launch',
    start: \`\${today} 00:00:00\`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'green',
  },
  {
    id: 5,
    title: 'Year Kickoff',
    start: \`\${today} 00:00:00\`,
    end: dayjs(today).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'blue',
  },
];
`;

export const businessEventsCode = `
import dayjs from 'dayjs';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events = [
  {
    id: 1,
    title: '清晨会议',
    start: \`\${today} 08:30:00\`,
    end: \`\${today} 09:00:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '工作时间任务 1',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:00:00\`,
    color: 'green',
  },
  {
    id: 3,
    title: '工作时间任务 2',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 15:00:00\`,
    color: 'violet',
  },
  {
    id: 4,
    title: '晚间同步',
    start: \`\${today} 17:30:00\`,
    end: \`\${today} 18:00:00\`,
    color: 'orange',
  },
];
`;
