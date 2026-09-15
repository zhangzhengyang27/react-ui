import dayjs from 'dayjs';
import { Box, UnstyledButton } from '@xiaoye-react/ui';
import { MonthView, ScheduleEventData } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const startOfMonth = dayjs('2024-01-15').startOf('month');

const eventData: ScheduleEventData[] = [
  {
    id: 1,
    title: 'Company Retreat',
    start: startOfMonth.add(2, 'day').format('YYYY-MM-DD 00:00:00'),
    end: startOfMonth.add(3, 'day').format('YYYY-MM-DD 00:00:00'),
    color: 'blue',
  },
  {
    id: 2,
    title: '团队会议',
    start: startOfMonth.add(2, 'day').format('YYYY-MM-DD 09:00:00'),
    end: startOfMonth.add(2, 'day').format('YYYY-MM-DD 10:00:00'),
    color: 'green',
  },
  {
    id: 3,
    title: '项目截止日期',
    start: startOfMonth.add(8, 'day').format('YYYY-MM-DD 00:00:00'),
    end: startOfMonth.add(9, 'day').format('YYYY-MM-DD 00:00:00'),
    color: 'red',
  },
  {
    id: 4,
    title: '与客户共进午餐',
    start: startOfMonth.add(8, 'day').format('YYYY-MM-DD 12:00:00'),
    end: startOfMonth.add(8, 'day').format('YYYY-MM-DD 13:30:00'),
    color: 'orange',
  },
  {
    id: 5,
    title: '代码审查',
    start: startOfMonth.add(8, 'day').format('YYYY-MM-DD 15:00:00'),
    end: startOfMonth.add(8, 'day').format('YYYY-MM-DD 16:00:00'),
    color: 'violet',
  },
  {
    id: 6,
    title: '迭代计划',
    start: startOfMonth.add(15, 'day').format('YYYY-MM-DD 10:00:00'),
    end: startOfMonth.add(15, 'day').format('YYYY-MM-DD 11:30:00'),
    color: 'cyan',
  },
  {
    id: 7,
    title: '设计工作坊',
    start: startOfMonth.add(15, 'day').format('YYYY-MM-DD 14:00:00'),
    end: startOfMonth.add(15, 'day').format('YYYY-MM-DD 16:00:00'),
    color: 'grape',
  },
  {
    id: 8,
    title: '会议',
    start: startOfMonth.add(20, 'day').format('YYYY-MM-DD 00:00:00'),
    end: startOfMonth.add(22, 'day').format('YYYY-MM-DD 00:00:00'),
    color: 'pink',
  },
];

function isAllDayEvent(event: ScheduleEventData) {
  const start = dayjs(event.start);
  const end = dayjs(event.end);
  return start.isSame(start.startOf('day')) && end.isSame(end.startOf('day'));
}

const code = `
import dayjs from 'dayjs';
import { Box, UnstyledButton } from '@xiaoye-react/ui';
import { MonthView, ScheduleEventData } from '@xiaoye-react/ui';

function isAllDayEvent(event: ScheduleEventData) {
  const start = dayjs(event.start);
  const end = dayjs(event.end);
  return start.isSame(start.startOf('day')) && end.isSame(end.startOf('day'));
}

const events: ScheduleEventData[] = [/* ...events */];

function Demo() {
  return (
    <MonthView
      date={new Date('2024-01-15')}
      events={events}
      renderEvent={(event, props) => {
        if (isAllDayEvent(event)) {
          return <UnstyledButton {...props} />;
        }

        const { children, className, style, ...others } = props;
        return (
          <UnstyledButton
            {...others}
            style={{
              ...style,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 10,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              pointerEvents: 'all',
              cursor: 'pointer',
              paddingInline: 2,
            }}
          >
            <Box
              component="span"
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: \`var(--event-bg)\`,
                flexShrink: 0,
              }}
            />
            <span style={{ width: 28, flexShrink: 0 }}>{dayjs(event.start).format('h:mm')}</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {event.title}
            </span>
          </UnstyledButton>
        );
      }}
    />
  );
}
`;

function Demo() {
  return (
    <MonthView
      date={new Date('2024-01-15')}
      events={eventData}
      renderEvent={(event, props) => {
        if (isAllDayEvent(event)) {
          return <UnstyledButton {...props} />;
        }

        const { children, className, style, ...others } = props;
        return (
          <UnstyledButton
            {...others}
            style={{
              ...style,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 10,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              pointerEvents: 'all',
              cursor: 'pointer',
              paddingInline: 2,
            }}
          >
            <Box
              component="span"
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: `var(--event-bg)`,
                flexShrink: 0,
              }}
            />
            <span style={{ width: 28, flexShrink: 0 }}>{dayjs(event.start).format('h:mm')}</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.title}</span>
          </UnstyledButton>
        );
      }}
    />
  );
}

export const timedEvents: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    {
      fileName: 'events.ts',
      code: `import dayjs from 'dayjs';\nimport { ScheduleEventData } from '@xiaoye-react/ui';\n\nconst startOfMonth = dayjs('2024-01-15').startOf('month');\n\nexport const events: ScheduleEventData[] = ${JSON.stringify(eventData, null, 2)};`,
      language: 'tsx',
    },
  ],
};
