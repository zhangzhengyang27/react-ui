import { MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function GetTemplates() {
  return (
    <>
      <MdxTitle id="templates">社区模板</MdxTitle>
      <MdxParagraph>
        ReactUI 拥有活跃的社区，开发者们创建了各种模板和最佳实践。你可以从以下渠道获取：
      </MdxParagraph>
      <MdxParagraph>
        - GitHub 上的 <code>awesome-react-ui</code> 仓库
        <br />- ReactUI Discord 社区的 <code>#templates</code> 频道
        <br />- npm 上搜索 <code>react-ui-template</code> 关键字
      </MdxParagraph>
    </>
  );
}
