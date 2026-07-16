import dayjs from 'dayjs';
import { ScheduleEventData } from '@react-ui/schedule';

const thisMonth = dayjs('2024-01-15').format('YYYY-MM');

export const regularEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队会议',
    start: `${thisMonth}-05 09:00:00`,
    end: `${thisMonth}-05 10:00:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '项目评审',
    start: `${thisMonth}-05 14:00:00`,
    end: `${thisMonth}-05 15:30:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '会议',
    start: `${thisMonth}-10 00:00:00`,
    end: `${thisMonth}-12 00:00:00`,
    color: 'violet',
  },
  {
    id: 4,
    title: '与客户共进午餐',
    start: `${thisMonth}-15 12:00:00`,
    end: `${thisMonth}-15 13:30:00`,
    color: 'orange',
  },
  {
    id: 5,
    title: '迭代计划',
    start: `${thisMonth}-15 15:00:00`,
    end: `${thisMonth}-15 17:00:00`,
    color: 'cyan',
  },
  {
    id: 6,
    title: '代码审查',
    start: `${thisMonth}-20 10:00:00`,
    end: `${thisMonth}-20 11:00:00`,
    color: 'pink',
  },
  {
    id: 7,
    title: '研讨会日',
    start: `${thisMonth}-25 00:00:00`,
    end: `${thisMonth}-25 00:00:00`,
    color: 'yellow',
  },
];

export const dataCode = `
import dayjs from 'dayjs';

const thisMonth = dayjs('2024-01-15').format('YYYY-MM');

export const events = [
  {
    id: 1,
    title: '团队会议',
    start: \`\${thisMonth}-05 09:00:00\`,
    end: \`\${thisMonth}-05 10:00:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '项目评审',
    start: \`\${thisMonth}-05 14:00:00\`,
    end: \`\${thisMonth}-05 15:30:00\`,
    color: 'green',
  },
  {
    id: 3,
    title: '会议',
    start: \`\${thisMonth}-10 00:00:00\`,
    end: \`\${thisMonth}-12 00:00:00\`,
    color: 'violet',
  },
  // ... more events
];
`;
