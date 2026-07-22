import { MdxCodeHighlight, MdxCode, MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function ComboboxData({ component }: { component: string }) {
  const getStringArrayCode = `import { ${component} } from '@xiaoye-react/ui';

function Demo() {
  return <${component} data={['React', 'Angular']} />;
}
`;

  const getArrayCode = `import { ${component} } from '@xiaoye-react/ui';

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

  const getStringGroupsCode = `import { ${component} } from '@xiaoye-react/ui';

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

  const getGroupsCode = `import { ${component} } from '@xiaoye-react/ui';

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
      <MdxCodeHighlight language="tsx" code={getStringArrayCode} />
      {stringDataFormat && (
        <>
          <MdxParagraph>
            包含 <MdxCode>value</MdxCode>、<MdxCode>label</MdxCode> 和可选{' '}
            <MdxCode>disabled</MdxCode> 键的对象数组：
          </MdxParagraph>
          <MdxCodeHighlight language="tsx" code={getArrayCode} />
        </>
      )}
      <MdxParagraph>
        包含{!stringDataFormat ? '字符串' : '原始值（字符串、数字、布尔值）'}选项的分组数组：
      </MdxParagraph>
      <MdxCodeHighlight language="tsx" code={getStringGroupsCode} />
      {stringDataFormat && (
        <>
          <MdxParagraph>包含对象选项的分组数组：</MdxParagraph>
          <MdxCodeHighlight language="tsx" code={getGroupsCode} />
        </>
      )}
    </>
  );
}
