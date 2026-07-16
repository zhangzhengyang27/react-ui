import { MdxCodeHighlight } from '../MdxPre/MdxPre';
import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxParagraph } from '../MdxTypography/MdxTypography';

interface MdxComboboxDataProps {
  component: string;
}

const getStringArrayCode = (component: string) => `
import { ${component} } from '@react-ui/ui';

function Demo() {
  return <${component} data={['React', 'Angular']} />;
}
`;

const getArrayCode = (component: string) => `
import { ${component} } from '@react-ui/ui';

function Demo() {
  return (
    <${component}
      data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
      ]}
    />
  );
}
`;

const getStringGroupsCode = (component: string) => `
import { ${component} } from '@react-ui/ui';

function Demo() {
  return (
    <${component}
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Express', 'Django'] },
      ]}
    />
  );
}
`;

const getGroupsCode = (component: string) => `
import { ${component} } from '@react-ui/ui';

function Demo() {
  return (
    <${component}
      data={[
        { group: 'Frontend', items: [{ value: 'react', label: 'React' }, { value: 'ng', label: 'Angular' }] },
        { group: 'Backend', items: [{ value: 'express', label: 'Express' }, { value: 'django', label: 'Django' }] },
      ]}
    />
  );
}
`;

export function MdxComboboxData({ component }: MdxComboboxDataProps) {
  const stringDataFormat = component !== 'Autocomplete' && component !== 'TagsInput';
  return (
    <>
      <MdxTitle id="data-formats">数据格式</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 的 <MdxCode>data</MdxCode> 属性接受以下格式之一的数据：
      </MdxParagraph>

      <MdxParagraph>
        {!stringDataFormat ? '字符串' : '原始值（字符串、数字、布尔值）'}数组：
      </MdxParagraph>

      <MdxCodeHighlight language="tsx" code={getStringArrayCode(component)} />

      {stringDataFormat && (
        <>
          <MdxParagraph>
            包含 <MdxCode>value</MdxCode>、<MdxCode>label</MdxCode> 和可选{' '}
            <MdxCode>disabled</MdxCode> 键的对象数组：
          </MdxParagraph>
          <MdxCodeHighlight language="tsx" code={getArrayCode(component)} />
        </>
      )}

      <MdxParagraph>
        包含{!stringDataFormat ? '字符串' : '原始值（字符串、数字、布尔值）'}选项的分组数组：
      </MdxParagraph>
      <MdxCodeHighlight language="tsx" code={getStringGroupsCode(component)} />

      {stringDataFormat && (
        <>
          <MdxParagraph>包含对象选项的分组数组：</MdxParagraph>
          <MdxCodeHighlight language="tsx" code={getGroupsCode(component)} />
        </>
      )}
    </>
  );
}
