import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxLi, MdxParagraph, MdxUl } from '../MdxTypography/MdxTypography';

interface MdxComboboxFilteringProps {
  component: string;
}

const valueFormat = '{ value: string; label: string; disabled?: boolean }';

export function MdxComboboxFiltering({ component }: MdxComboboxFilteringProps) {
  return (
    <>
      <MdxTitle id="options-filtering">选项过滤</MdxTitle>
      默认情况下，<MdxCode>{component}</MdxCode> 通过检查选项标签是否包含输入值来过滤选项。
      你可以使用 <MdxCode>filter</MdxCode>{' '}
      属性更改此行为。<MdxCode>filter</MdxCode> 函数接收一个包含以下属性的对象作为唯一参数：
      <MdxUl>
        <MdxLi>
          <MdxCode>options</MdxCode> — 选项或选项分组的数组，所有选项均为{' '}
          <MdxCode>{valueFormat}</MdxCode> 格式
        </MdxLi>
        <MdxLi>
          <MdxCode>search</MdxCode> — 当前搜索查询
        </MdxLi>
        <MdxLi>
          <MdxCode>limit</MdxCode> — 传递给 <MdxCode>{component}</MdxCode> 的 <MdxCode>limit</MdxCode> 属性值
        </MdxLi>
      </MdxUl>
      <MdxParagraph>
        下面是一个自定义过滤函数的示例，它按单词匹配选项而非按字母序列匹配：
      </MdxParagraph>
    </>
  );
}
