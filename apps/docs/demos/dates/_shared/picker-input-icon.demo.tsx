import { useState } from 'react'
import { componentName } from './component-name';

import { CalendarBlankIcon } from '@phosphor-icons/react/dist/csr/CalendarBlank'
import { UIDemo } from '@xiaoye-react/demo'

const getCode = (name: string) => `
import { useState } from 'react';
import { CalendarBlankIcon } from '@phosphor-icons/react/dist/csr/CalendarBlank';
import { ${name} } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  const icon = <CalendarBlankIcon size={18} />;
  return (
    <${name}
      leftSection={<CalendarBlankIcon size={18} />}
      leftSectionPointerEvents="none"
      label="选择日期"
      placeholder="选择日期"
      value={value}
      onChange={setValue}
    />
  );
}
`

function getDemo(Component: React.FC<any>) {
    return () => {
        const [value, setValue] = useState<string | null>(null)
        return (
            <Component
                leftSection={<CalendarBlankIcon size={18} />}
                leftSectionPointerEvents="none"
                label="选择日期"
                placeholder="选择日期"
                value={value}
                onChange={setValue}
            />
        )
    }
}

export function getPickerInputIconDemo(Component: React.FC<any>): UIDemo {
    return {
        type: 'code',
        centered: true,
        maxWidth: 400,
        code: getCode(componentName(Component)),
        component: getDemo(Component)
    }
}
