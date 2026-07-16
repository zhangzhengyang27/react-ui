import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxParagraph } from '../MdxTypography/MdxTypography';

interface MdxComboboxLargeDataProps {
  component: string;
}

export function MdxComboboxLargeData({ component }: MdxComboboxLargeDataProps) {
  return (
    <>
      <MdxTitle id="large-data-sets">大数据集</MdxTitle>
      <MdxParagraph>
        处理大数据集的最佳策略是限制同时渲染的选项数量。你可以使用 <MdxCode>limit</MdxCode>{' '}
        属性来实现。注意，如果你使用自定义的 <MdxCode>filter</MdxCode> 函数，需要自行实现限制{' '}
        <MdxCode>filter</MdxCode> 中选项数量的逻辑。
      </MdxParagraph>

      <MdxParagraph>
        下面是 <MdxCode>{component}</MdxCode> 包含 100,000 个选项、同时渲染 5 个选项的示例：
      </MdxParagraph>
    </>
  );
}
