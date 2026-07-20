import { Box, Typography } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const html = `
<h1>示例文章</h1>
<p>这是一篇用于展示 <strong>Typography</strong> 组件真实排版样式的示例文章。以下内容覆盖了标题、段落、列表、引用等多种排版元素，帮助你直观感受组件的默认样式。</p>
<h2>文章正文</h2>
<p>良好的排版是优秀用户界面的基石。当文字清晰易读、层级分明时，用户能够更快地获取信息并理解页面结构。Typography 组件提供了一整套经过精心调整的样式，涵盖从标题到正文的各个层级。</p>
<p>在设计系统时，我们需要考虑字重、行高、段间距以及列表样式等细节。这些看似微小的调整，往往会对整体阅读体验产生巨大的影响。</p>
<h3>保持一致性</h3>
<p>一致性是设计系统的核心原则之一。当所有页面都遵循相同的排版规范时，用户在不同模块之间切换会感到熟悉和舒适。<strong>统一的字号、颜色和对齐方式能够显著降低认知负担。</strong></p>
<p>例如，在一个表单页面中，标签、提示文本和错误信息应该使用预定义的样式，而不是随意指定颜色或字号。这样可以确保无论由哪位开发者实现，最终呈现的效果都保持一致。</p>
<p>以下是一些排版建议：</p>
<p><em>始终保持标题层级的连贯性，不要跳过某个层级。合理使用列表和引用可以让长文更易读。</em></p>
<h3>关注可读性</h3>
<p>除了视觉一致性，可读性同样重要。<strong>适当的行高和段间距能够让眼睛更轻松地跟随文字流动。</strong>对于中文内容来说，通常建议使用比英文稍大的行高，以容纳复杂的汉字结构。</p>
<p>在选择字体时，也应考虑不同操作系统和设备的渲染差异。使用系统字体栈是一个稳妥的选择，它能够在保证性能的同时提供良好的显示效果。</p>
<p>总之，Typography 组件的目标是让开发者能够专注于内容本身，而不必为样式细节操心。通过合理使用这些预设样式，你可以快速构建出专业且易读的界面。</p>
`;

const code = `
import { Typography } from '@react-ui/ui';

const html = '...HTML 内容...';

function Demo() {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
  );
}
`;

function Demo() {
  return (
    <Box maw={560} mx="auto">
      <Typography>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Typography>
    </Box>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
