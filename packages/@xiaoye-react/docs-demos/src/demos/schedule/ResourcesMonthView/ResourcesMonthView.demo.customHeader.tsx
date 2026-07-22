import dayjs from 'dayjs';
import { useState } from 'react';
import { DateStringValue, ResourcesMonthView, ScheduleHeader } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, resourceEvents, resources } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { DateStringValue, ResourcesMonthView, ScheduleHeader } from '@xiaoye-react/schedule';
import { events, resources } from './data';

function Demo() {
  const [date, setDate] = useState<DateStringValue>(
    dayjs('2024-01-15').format('YYYY-MM-DD')
  );

  return (
    <div>
      <ScheduleHeader>
        <ScheduleHeader.Previous
          onClick={() =>
            setDate(
              dayjs(date)
                .subtract(1, 'month')
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.MonthYearSelect
          yearValue={dayjs(date).year()}
          monthValue={dayjs(date).month()}
          onYearChange={(year) =>
            setDate(
              dayjs(date)
                .year(year)
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue
            )
          }
          onMonthChange={(month) =>
            setDate(
              dayjs(date)
                .month(month)
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.Next
          onClick={() =>
            setDate(
              dayjs(date)
                .add(1, 'month')
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.Today
          onClick={() =>
            setDate(
              dayjs('2024-01-15').format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
      </ScheduleHeader>

      <ResourcesMonthView
        date={date}
        onDateChange={setDate}
        resources={resources}
        events={events}
        withHeader={false}
      />
    </div>
  );
}
`;

function Demo() {
  const [date, setDate] = useState<DateStringValue>(
    dayjs('2024-01-15').format('YYYY-MM-DD') as DateStringValue
  );

  return (
    <div>
      <ScheduleHeader>
        <ScheduleHeader.Previous
          onClick={() =>
            setDate(
              dayjs(date)
                .subtract(1, 'month')
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.MonthYearSelect
          yearValue={dayjs(date).year()}
          monthValue={dayjs(date).month()}
          onYearChange={(year) =>
            setDate(dayjs(date).year(year).startOf('month').format('YYYY-MM-DD') as DateStringValue)
          }
          onMonthChange={(month) =>
            setDate(
              dayjs(date).month(month).startOf('month').format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.Next
          onClick={() =>
            setDate(
              dayjs(date).add(1, 'month').startOf('month').format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.Today
          onClick={() => setDate(dayjs('2024-01-15').format('YYYY-MM-DD') as DateStringValue)}
        />
      </ScheduleHeader>

      <ResourcesMonthView
        date={date}
        onDateChange={setDate}
        resources={resources}
        events={resourceEvents}
        withHeader={false}
      />
    </div>
  );
}

export const customHeader: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
