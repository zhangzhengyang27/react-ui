import dayjs from 'dayjs';
import { ScheduleEventData } from '@react-ui/schedule';

const thisYear = dayjs('2024-01-15').format('YYYY');

export const regularEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '新年',
    start: `${thisYear}-01-01 00:00:00`,
    end: dayjs(`${thisYear}-01-01`).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'blue',
  },
  {
    id: 2,
    title: '春季活动',
    start: `${thisYear}-03-15 00:00:00`,
    end: dayjs(`${thisYear}-03-15`).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'green',
  },
  {
    id: 3,
    title: '夏季会议',
    start: `${thisYear}-07-20 00:00:00`,
    end: dayjs(`${thisYear}-07-20`).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'orange',
  },
  {
    id: 4,
    title: '秋季研讨会',
    start: `${thisYear}-10-10 00:00:00`,
    end: dayjs(`${thisYear}-10-10`).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'violet',
  },
  {
    id: 5,
    title: '年终派对',
    start: `${thisYear}-12-25 00:00:00`,
    end: dayjs(`${thisYear}-12-25`).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
];

export const dataCode = `
import dayjs from 'dayjs';

const thisYear = dayjs('2024-01-15').format('YYYY');

const events = [
  {
    id: 1,
    title: '新年',
    start: \\\`\\\${thisYear}-01-01 00:00:00\\\`,
    end: dayjs(\\\`\\\${thisYear}-01-01\\\`).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'blue',
  },
  {
    id: 2,
    title: '春季活动',
    start: \\\`\\\${thisYear}-03-15 00:00:00\\\`,
    end: dayjs(\\\`\\\${thisYear}-03-15\\\`).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'green',
  },
];
`;
