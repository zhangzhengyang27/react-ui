export interface ReviewData {
  title: string;
  body: string;
  link: string;
  author: {
    avatar: string;
    nickname: string;
  };
}

export const reviews: ReviewData[] = [
  {
    title: '我用过最好的 UI 库之一。',
    body: '<p>我是一名高级前端开发者，想尝试一些 Material UI 之外的新选择，于是发现了 ReactUI。它已经考虑到了你可能遇到的各种场景，Hooks 更是让人爱不释手 :)</p><p>非常感谢。</p>',
    link: 'https://github.com/react-ui-org/react-ui/discussions/5783',
    author: {
      nickname: 'smsuraj100',
      avatar: 'https://avatars.githubusercontent.com/u/16137686?v=4',
    },
  },
  {
    title: '你们做到了！',
    body: "<p>我做了 20 年前端。毫无疑问，这是我用过最好的组件库。更棒的是，我之前不太喜欢的地方（JS 对象样式、大表单性能）在 v7 中都已经得到了解决。请继续保持，这个库值得被更多人知道，它就是能稳定、漂亮地工作。非常感谢 <a href='https://github.com/rtivital' target='_blank'>@rtivital</a> 和所有贡献者！</p>",
    link: 'https://github.com/react-ui-org/react-ui/discussions/6150',
    author: {
      nickname: 'sideral',
      avatar: 'https://avatars.githubusercontent.com/u/192025?v=4',
    },
  },
  {
    title: '好得不可思议',
    body: '<p>希望这样的帖子没问题——只是想表达感谢。</p><p>我已经从事软件开发 25 年，其中 15 年都在做 Web（主要是公司内部项目）。这无疑是我用过最好的组件库。</p><p>其他库我总是很快就会遇到能力边界，不得不花大量时间和精力去定制或扩展。而 ReactUI 不仅能让你轻松访问底层实现，99% 你需要的功能都作为默认选项提供了。我已经数不清有多少次“看来我得自己实现那个标准功能了……哦等等，他们也有”的时刻。而且文档也非常完美。</p><p>太棒了，谢谢。</p>',
    link: 'https://github.com/react-ui-org/react-ui/discussions/5504',
    author: {
      nickname: 'leighton-carr',
      avatar: 'https://avatars.githubusercontent.com/u/18201458?v=4',
    },
  },
  {
    title: '感谢 ui 💘',
    body: '<p>亲爱的 ReactUI 团队，感谢你们将这个库整合出来。我业余时间已经开始使用并喜欢上 ReactUI，现在也正把它引入我们公司。所有开发者都对开发体验非常满意，大型项目节省的时间非常可观。我们与设计师、开发者之间拥有的灵活性将催生出优秀的产品。感谢每一位贡献者，继续保持！</p>',
    link: 'https://github.com/react-ui-org/react-ui/discussions/3741',
    author: {
      nickname: 'Gitgud6969',
      avatar: 'https://avatars.githubusercontent.com/u/57042505?v=4',
    },
  },
  {
    title: '每个问题都有解决方案',
    body: '<p>ReactUI 为我在 Web 应用中遇到的每个问题都提供了解决方案。组件和属性命名清晰，设计选择追求简洁，而且开箱即用就非常美观。感谢你们极大地推动了我的应用开发！</p>',
    link: 'https://github.com/react-ui-org/react-ui/discussions/5456',
    author: {
      nickname: 'SeeSharpCode',
      avatar: 'https://avatars.githubusercontent.com/u/10228483?v=4',
    },
  },
  {
    title: '感谢 ReactUI！',
    body: '<p>在我见过的所有 React 组件库中，这个是最直观、最易用、文档最完善、也最漂亮的。我计划全面切换到 ReactUI。只想对创造它的人说一声由衷的感谢。</p>',
    link: 'https://github.com/react-ui-org/react-ui/discussions/259',
    author: {
      nickname: 'OmkoBass',
      avatar: 'https://avatars.githubusercontent.com/u/40026131?v=4',
    },
  },
];
