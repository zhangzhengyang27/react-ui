// 批量修复 hooks 文档的 subtitle：将英文 hook 名替换为中文描述
// 同时把 description 中的 placeholder 文案同步更新

const fs = require('fs');
const path = require('path');

const hooksDir = path.join(__dirname, '..', 'docs', 'hooks');

// hook name → 中文 subtitle
const subtitleMap = {
  'use-click-outside': '点击外部监听',
  'use-clipboard': '剪贴板',
  'use-collapse': '折叠状态',
  'use-color-scheme': '配色方案',
  'use-counter': '计数器',
  'use-debounced-callback': '防抖回调',
  'use-debounced-state': '防抖状态',
  'use-debounced-value': '防抖值',
  'use-did-update': '更新副作用',
  'use-disclosure': '显隐控制',
  'use-document-title': '文档标题',
  'use-document-visibility': '文档可见性',
  'use-drag': '拖拽手势',
  'use-element-size': '元素尺寸',
  'use-event-listener': '事件监听',
  'use-eye-dropper': '取色器',
  'use-favicon': '网站图标',
  'use-fetch': '数据请求',
  'use-file-dialog': '文件选择对话框',
  'use-floating-window': '浮动窗口',
  'use-focus-return': '焦点返回',
  'use-focus-trap': '焦点陷阱',
  'use-focus-within': '内部焦点',
  'use-force-update': '强制更新',
  'use-fullscreen': '全屏控制',
  'use-hash': 'URL 哈希',
  'use-headroom': '滚动隐藏',
  'use-hotkeys': '快捷键',
  'use-hover': '悬停',
  'use-id': '唯一 ID',
  'use-idle': '空闲状态',
  'use-in-viewport': '视口内检测',
  'use-input-state': '输入状态',
  'use-intersection': '交叉观察',
  'use-interval': '定时器',
  'use-is-first-render': '首次渲染',
  'use-isomorphic-effect': '同构 Effect',
  'use-list-state': '列表状态',
  'use-local-storage': '本地存储',
  'use-logger': '日志',
  'use-long-press': '长按',
  'use-map': 'Map 状态',
  'use-mask': '输入掩码',
  'use-media-query': '媒体查询',
  'use-merged-ref': '合并 Ref',
  'use-mounted': '挂载状态',
  'use-mouse': '鼠标位置',
  'use-move': '移动手势',
  'use-mutation-observer': 'Mutation 观察者',
  'use-network': '网络状态',
  'use-orientation': '屏幕方向',
  'use-os': '操作系统检测',
  'use-page-leave': '离开页面',
  'use-pagination': '分页',
  'use-previous': '上一次值',
  'use-queue': '队列',
  'use-radial-move': '径向移动',
  'use-reduced-motion': '减少动画',
  'use-resize-observer': '尺寸观察者',
  'use-roving-index': '漫游索引',
  'use-scroll-direction': '滚动方向',
  'use-scroll-into-view': '滚动到视口',
  'use-scroll-spy': '滚动监听',
  'use-scroller': '滚动器',
  'use-selection': '选择集合',
  'use-set': 'Set 状态',
  'use-set-state': '状态设置',
  'use-shallow-effect': '浅层 Effect',
  'use-splitter': '分隔条',
  'use-state-history': '状态历史',
  'use-text-selection': '文本选择',
  'use-throttled-callback': '节流回调',
  'use-throttled-state': '节流状态',
  'use-throttled-value': '节流值',
  'use-timeout': '超时',
  'use-toggle': '切换',
  'use-uncontrolled': '非受控状态',
  'use-validated-state': '校验状态',
  'use-viewport-size': '视口尺寸',
  'use-window-event': '窗口事件',
  'use-window-scroll': '窗口滚动',
  'package': '包概览',
};

let modified = 0;
let skipped = 0;

function processFile(filePath, hookKey) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const subtitle = subtitleMap[hookKey];

  if (!subtitle) {
    console.warn(`[WARN] No subtitle for: ${hookKey} (${path.basename(filePath)})`);
    return;
  }

  // 替换 subtitle 字段（第四行）
  content = content.replace(
    /^(subtitle:\s*).+$/m,
    `$1${subtitle}`
  );

  // 同步更新 description（如果包含 "react-ui XxxYyy 文档。" 格式）
  const hookTitle = hookKey === 'package'
    ? 'Package'
    : hookKey.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  const descRegex = new RegExp(`^(description:\\s*react-ui )${hookTitle}( 文档。)$`, 'm');
  content = content.replace(descRegex, `$1${subtitle} Hook$2`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modified++;
  } else {
    skipped++;
  }
}

// 遍历 docs/hooks/ 目录下的所有 .zh-CN.md 文件
const items = fs.readdirSync(hooksDir);
for (const item of items) {
  const fullPath = path.join(hooksDir, item);

  if (item.endsWith('.zh-CN.md')) {
    // 顶层 hook 文档：use-xxx.zh-CN.md 或 package.zh-CN.md
    const hookKey = item.replace('.zh-CN.md', '');
    processFile(fullPath, hookKey);
  } else if (fs.statSync(fullPath).isDirectory()) {
    // 子目录中的 .zh-CN.md 文件（如 use-click-outside/use-click-outside.zh-CN.md）
    const subItems = fs.readdirSync(fullPath);
    for (const sub of subItems) {
      if (sub.endsWith('.zh-CN.md')) {
        const subPath = path.join(fullPath, sub);
        // 子目录的 hook key 取目录名
        processFile(subPath, item);
      }
    }
  }
}

console.log(`\n✅ 修改完成: ${modified} 个文件`);
console.log(`⏭️  跳过: ${skipped} 个文件（无变化）`);
