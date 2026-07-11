import { MdxLink } from '../MdxLink/MdxLink';
import { Template } from '../MdxTemplatesList/data';
import { MdxTemplatesList } from '../MdxTemplatesList/MdxTemplatesList';
import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxParagraph } from '../MdxTypography/MdxTypography';

interface MdxGetTemplatesProps {
  type: Template['type'];
}

export function MdxGetTemplates({ type }: MdxGetTemplatesProps) {
  return (
    <>
      <MdxTitle id="templates">Get started with a template</MdxTitle>
      <MdxParagraph>
        The easiest way to get started is to use one of the templates. All templates are configured
        correctly: they include <MdxLink href="/styles/postcss-preset">PostCSS setup</MdxLink>,{' '}
        <MdxLink href="/theming/color-schemes">ColorSchemeScript</MdxLink> and other essential
        features. Some templates also include additional features like{' '}
        <MdxLink href="/guides/jest">Jest</MdxLink>,{' '}
        <MdxLink href="/guides/storybook">Storybook</MdxLink> and oxlint.
      </MdxParagraph>

      <MdxParagraph>
        如果你不熟悉 GitHub，可以参考{' '}
        <MdxLink href="https://github.com/xiaoye/react-ui/discussions">社区讨论</MdxLink>{' '}
        获取详细的项目模板使用说明。
      </MdxParagraph>
      <MdxTemplatesList type={type} />
    </>
  );
}
