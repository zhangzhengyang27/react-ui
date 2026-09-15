import dayjs from 'dayjs';
import { ScheduleEventData } from '@xiaoye-react/ui';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const startOfMonth = dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD');
const midMonth = dayjs('2024-01-15').date(15).format('YYYY-MM-DD');
const endOfMonth = dayjs('2024-01-15').endOf('month').format('YYYY-MM-DD');

export const regularEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队会议',
    start: `${startOfMonth} 09:00:00`,
    end: `${startOfMonth} 10:30:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '项目截止日期',
    start: `${midMonth} 00:00:00`,
    end: dayjs(midMonth).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
  {
    id: 3,
    title: '客户电话',
    start: `${today} 14:00:00`,
    end: `${today} 15:00:00`,
    color: 'green',
  },
  {
    id: 4,
    title: '月度回顾',
    start: `${endOfMonth} 00:00:00`,
    end: dayjs(endOfMonth).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'violet',
  },
  {
    id: 5,
    title: '研讨会',
    start: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 10:00:00'),
    end: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 12:00:00'),
    color: 'orange',
  },
  {
    id: 6,
    title: '会议',
    start: dayjs('2024-01-15').add(5, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'cyan',
  },
];

export const manyEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: 'Event 1',
    start: `${today} 09:00:00`,
    end: `${today} 10:00:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: 'Event 2',
    start: `${today} 10:00:00`,
    end: `${today} 11:00:00`,
    color: 'green',
  },
  {
    id: 3,
    title: 'Event 3',
    start: `${today} 11:00:00`,
    end: `${today} 12:00:00`,
    color: 'orange',
  },
  {
    id: 4,
    title: 'Event 4',
    start: `${today} 13:00:00`,
    end: `${today} 14:00:00`,
    color: 'violet',
  },
  {
    id: 5,
    title: 'Event 5',
    start: `${today} 14:00:00`,
    end: `${today} 15:00:00`,
    color: 'cyan',
  },
  {
    id: 6,
    title: 'Event 6',
    start: `${today} 15:00:00`,
    end: `${today} 16:00:00`,
    color: 'pink',
  },
];

export const dataCode = `
import dayjs from 'dayjs';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const startOfMonth = dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD');
const midMonth = dayjs('2024-01-15').date(15).format('YYYY-MM-DD');
const endOfMonth = dayjs('2024-01-15').endOf('month').format('YYYY-MM-DD');

export const events = [
  {
    id: 1,
    title: '团队会议',
    start: \`\${startOfMonth} 09:00:00\`,
    end: \`\${startOfMonth} 10:30:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '项目截止日期',
    start: \`\${midMonth} 00:00:00\`,
    end: dayjs(midMonth).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
  {
    id: 3,
    title: '客户电话',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 15:00:00\`,
    color: 'green',
  },
  {
    id: 4,
    title: '月度回顾',
    start: \`\${endOfMonth} 00:00:00\`,
    end: dayjs(endOfMonth).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'violet',
  },
  {
    id: 5,
    title: '研讨会',
    start: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 10:00:00'),
    end: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 12:00:00'),
    color: 'orange',
  },
  {
    id: 6,
    title: '会议',
    start: dayjs('2024-01-15').add(5, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'cyan',
  },
];
`;

export const manyEventsCode = `
import dayjs from 'dayjs';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

export const events = [
  {
    id: 1,
    title: 'Event 1',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 10:00:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: 'Event 2',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:00:00\`,
    color: 'green',
  },
  {
    id: 3,
    title: 'Event 3',
    start: \`\${today} 11:00:00\`,
    end: \`\${today} 12:00:00\`,
    color: 'orange',
  },
  {
    id: 4,
    title: 'Event 4',
    start: \`\${today} 13:00:00\`,
    end: \`\${today} 14:00:00\`,
    color: 'violet',
  },
  {
    id: 5,
    title: 'Event 5',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 15:00:00\`,
    color: 'cyan',
  },
  {
    id: 6,
    title: 'Event 6',
    start: \`\${today} 15:00:00\`,
    end: \`\${today} 16:00:00\`,
    color: 'pink',
  },
];
`;
