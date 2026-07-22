import dayjs from 'dayjs';
import { ScheduleEventData, ScheduleResourceData } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

export const resources: ScheduleResourceData[] = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
  { id: 'london', label: 'Meeting room: London' },
];

export const resourceEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队站会',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
    resourceId: 'tokyo',
  },
  {
    id: 2,
    title: '迭代计划',
    start: `${today} 10:00:00`,
    end: `${today} 11:30:00`,
    color: 'green',
    resourceId: 'tokyo',
  },
  {
    id: 3,
    title: '客户电话',
    start: `${today} 09:30:00`,
    end: `${today} 10:30:00`,
    color: 'violet',
    resourceId: 'paris',
  },
  {
    id: 4,
    title: '设计评审',
    start: `${today} 13:00:00`,
    end: `${today} 14:00:00`,
    color: 'orange',
    resourceId: 'paris',
  },
  {
    id: 5,
    title: '1:1 Meeting',
    start: `${today} 11:00:00`,
    end: `${today} 11:30:00`,
    color: 'cyan',
    resourceId: 'new-york',
  },
  {
    id: 6,
    title: '研讨会',
    start: `${today} 14:00:00`,
    end: `${today} 16:00:00`,
    color: 'pink',
    resourceId: 'new-york',
  },
  {
    id: 7,
    title: '架构评审',
    start: `${today} 10:00:00`,
    end: `${today} 11:00:00`,
    color: 'red',
    resourceId: 'london',
  },
  {
    id: 8,
    title: '回顾会议',
    start: `${today} 15:00:00`,
    end: `${today} 16:00:00`,
    color: 'grape',
    resourceId: 'london',
  },
];

export const dataCode = `
import dayjs from 'dayjs';
import { ScheduleResourceData } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const resources: ScheduleResourceData[] = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
  { id: 'london', label: 'Meeting room: London' },
];

const events = [
  {
    id: 1,
    title: '团队站会',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 09:30:00\`,
    color: 'blue',
    resourceId: 'tokyo',
  },
  {
    id: 2,
    title: '迭代计划',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:30:00\`,
    color: 'green',
    resourceId: 'tokyo',
  },
  {
    id: 3,
    title: '客户电话',
    start: \`\${today} 09:30:00\`,
    end: \`\${today} 10:30:00\`,
    color: 'violet',
    resourceId: 'paris',
  },
  {
    id: 4,
    title: '设计评审',
    start: \`\${today} 13:00:00\`,
    end: \`\${today} 14:00:00\`,
    color: 'orange',
    resourceId: 'paris',
  },
  {
    id: 5,
    title: '1:1 Meeting',
    start: \`\${today} 11:00:00\`,
    end: \`\${today} 11:30:00\`,
    color: 'cyan',
    resourceId: 'new-york',
  },
  {
    id: 6,
    title: '研讨会',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 16:00:00\`,
    color: 'pink',
    resourceId: 'new-york',
  },
  {
    id: 7,
    title: '架构评审',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:00:00\`,
    color: 'red',
    resourceId: 'london',
  },
  {
    id: 8,
    title: '回顾会议',
    start: \`\${today} 15:00:00\`,
    end: \`\${today} 16:00:00\`,
    color: 'grape',
    resourceId: 'london',
  },
];
`;
