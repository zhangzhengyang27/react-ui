import { Typography } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const html = `<h1>标题 1</h1>
<h2>标题 2</h2>
<h3>标题 3</h3>
<h4>标题 4</h4>
<h5>标题 5</h5>
<h6>标题 6</h6>
<hr />
<p><a href="#">ReactUI 链接</a></p>
<p>这是一段用于展示排版样式的示例文本。良好的排版能够提升可读性，让用户更轻松地获取信息。段落之间的间距、行高以及字重共同决定了整体的阅读体验。</p>
<img src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-10.png" alt="Unsplash 图片" />
<ul>
  <li>列表项 - 1</li>
  <li>列表项 - 2</li>
  <li>列表项 - 3</li>
  <li>列表项 - 4</li>
</ul>

<ol>
  <li>列表项 - 1</li>
  <li>列表项 - 2</li>
  <li>列表项 - 3</li>
  <li>列表项 - 4</li>
</ol>

<blockquote>
  生活就像 npm install——你永远不知道会得到什么。
  <cite>—— 阿甘</cite>
</blockquote>

<p>这是段落内的 <code>code</code>、<kbd>kbd</kbd> 和 <mark>mark</mark></p>

<pre>
import { Avatar } from '@xiaoye-react/ui';
import image from './image.png';

export function AvatarDemo() {
  return &lt;Avatar src={image} alt="it's me" /&gt;;
}</pre>

<table><thead><tr><th>元素位置</th><th>元素名称</th><th>符号</th><th>原子质量</th></tr></thead><tbody><tr><td>6</td><td>碳</td><td>C</td><td>12.011</td></tr><tr><td>7</td><td>氮</td><td>N</td><td>14.007</td></tr><tr><td>39</td><td>钇</td><td>Y</td><td>88.906</td></tr><tr><td>56</td><td>钡</td><td>Ba</td><td>137.33</td></tr><tr><td>58</td><td>铈</td><td>Ce</td><td>140.12</td></tr></tbody></table>`;

function Demo() {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
  );
}

export const all: UIDemo = {
  type: 'code',
  component: Demo,
};
