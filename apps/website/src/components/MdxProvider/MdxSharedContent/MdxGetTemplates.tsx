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
      <MdxTitle id="templates">使用模板开始</MdxTitle>
      <MdxParagraph>
        最简单的开始方式是使用项目模板。所有模板都已正确配置：包含{' '}
        <MdxLink href="/styles/postcss-preset">PostCSS 配置</MdxLink>、{' '}
        <MdxLink href="/theming/color-schemes">ColorSchemeScript</MdxLink>{' '}
        等必要功能。部分模板还额外包含{' '}
        <MdxLink href="/guides/jest">Jest</MdxLink>、{' '}
        <MdxLink href="/guides/storybook">Storybook</MdxLink> 和 oxlint。
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
