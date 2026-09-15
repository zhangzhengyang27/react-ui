import dayjs from 'dayjs';
import { useState } from 'react';
import { DateFormatter } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const getCode = (name: string) => `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ${name}, DateFormatter } from '@xiaoye-react/ui';

const formatter: DateFormatter = ({ type, date, locale, format }) => {
  if (type === 'multiple' && Array.isArray(date)) {
    if (date.length === 1) {
      return dayjs(date[0]).locale(locale).format(format);
    }

    if (date.length > 1) {
      return \`\${date.length} dates selected\`;
    }

    return '';
  }

  return '';
};

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <${name}
      label="选择 2 个或更多日期"
      placeholder="选择 2 个或更多日期"
      value={value}
      onChange={setValue}
      type="multiple"
      valueFormatter={formatter}
    />
  );
}
`;

const formatter: DateFormatter = ({ type, date, locale, format }) => {
  if (type === 'multiple' && Array.isArray(date)) {
    if (date.length === 1) {
      return dayjs(date[0]).locale(locale).format(format);
    }

    if (date.length > 1) {
      return `${date.length} dates selected`;
    }

    return '';
  }

  return '';
};

function getDemo(Component: React.FC<any>) {
  return () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <Component
        label="选择 2 个或更多日期"
        placeholder="选择 2 个或更多日期"
        value={value}
        onChange={setValue}
        type="multiple"
        valueFormatter={formatter}
      />
    );
  };
}

export function getPickerInputValueFormatterDemo(Component: React.FC<any>): UIDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode(Component.displayName!.replace('@xiaoye-react/dates/', '')),
    component: getDemo(Component),
  };
}
