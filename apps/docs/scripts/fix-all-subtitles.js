// 扫描所有 docs 下的 .zh-CN.md 文件，找出 title==subtitle 的情况
// 并根据文件名生成合适的中文 subtitle

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');

// title（PascalCase）→ 中文 subtitle 映射表
// 仅包含需要修改的（即 title == subtitle 的）
const titleToSubtitle = {
  // theming
  'Colors': '颜色',
  'Typography': '排版',
  'DefaultProps': '默认属性',
  'UiProvider': 'UI Provider',
  'ThemeObject': '主题对象',
  'ColorSchemes': '配色方案',
  // styles
  'CssVariables': 'CSS 变量',
  'StyleProps': '样式属性',
  'Style': '样式',
  'Sass': 'Sass',
  'CssFilesList': 'CSS 文件清单',
  'Emotion': 'Emotion',
  'Rem': 'rem 单位',
  'Responsive': '响应式',
  'PostcssPreset': 'PostCSS 预设',
  'VariantsSizes': '变体与尺寸',
  'CssModules': 'CSS Modules',
  'StylesApi': 'Styles API',
  'StylesOverview': '样式总览',
  'StylesPerformance': '样式性能',
  'UiStyles': 'UI 样式',
  'Unstyled': '无样式',
  'VanillaExtract': 'Vanilla Extract',
  'GlobalStyles': '全局样式',
  'DataAttributes': 'data 属性',
  'ColorFunctions': '颜色函数',
  'Rtl': 'RTL',
  // schedule
  'ResourcesDayView': '资源日视图',
  'ResourcesMonthView': '资源月视图',
  'ResourcesSchedule': '资源调度',
  'ResourcesWeekView': '资源周视图',
  'AgendaView': '议程视图',
  'DayView': '日视图',
  'MonthView': '月视图',
  'WeekView': '周视图',
  'YearView': '年视图',
  'MobileMonthView': '移动端月视图',
  'Schedule': '调度',
  'EventsData': '事件数据',
  'RecurringEvents': '重复事件',
  // theming/extras
  'ThemeIcon': '主题图标',
  // form
  'Actions': '表单动作',
  'Errors': '表单错误',
  'Nested': '嵌套表单',
  'Recipes': '表单配方',
  'Status': '表单状态',
  'UseForm': 'useForm',
  'Values': '表单值',
  'Package': '包概览',
  // x
  'Carousel': '轮播',
  'CodeHighlight': '代码高亮',
  'Dropzone': '拖拽上传',
  'Extensions': '扩展',
  'Modals': '模态框',
  'Notifications': '通知',
  'Nprogress': '进度条',
  'Spotlight': '聚光灯',
  'Tiptap': '富文本编辑器',
  // dates
  'Calendar': '日历',
  'DateInput': '日期输入',
  'DatePickerInput': '日期选择输入',
  'DatePicker': '日期选择器',
  'DateTimePicker': '日期时间选择器',
  'InlineDateTimePicker': '内联日期时间选择器',
  'MiniCalendar': '迷你日历',
  'MonthPickerInput': '月份选择输入',
  'MonthPicker': '月份选择器',
  'TimeGrid': '时间网格',
  'TimeInput': '时间输入',
  'TimePicker': '时间选择器',
  'TimeValue': '时间值',
  'YearPickerInput': '年份选择输入',
  'YearPicker': '年份选择器',
  // charts
  'AreaChart': '区域图',
  'BarChart': '柱状图',
  'BarsList': '柱状列表',
  'BubbleChart': '气泡图',
  'CompositeChart': '组合图',
  'DonutChart': '环形图',
  'FunnelChart': '漏斗图',
  'Heatmap': '热力图',
  'LineChart': '折线图',
  'PieChart': '饼图',
  'RadarChart': '雷达图',
  'RadialBarChart': '径向柱状图',
  'SankeyChart': '桑基图',
  'ScatterChart': '散点图',
  'Sparkline': '迷你图',
  'Treemap': '矩形树图',
  'GettingStarted': '快速上手',
  // form extras
  'AllInputs': '全部输入组件',
  'CreateFormContext': '创建表单上下文',
  'GetInputProps': '获取输入属性',
  'SchemaValidation': 'Schema 校验',
  'Uncontrolled': '非受控模式',
  'UseField': 'useField',
  'Validation': '表单校验',
  'Validators': '校验器',
  // guides
  'ControlledVsUncontrolled': '受控与非受控',
  'CustomComponents': '自定义组件',
  'FunctionsReference': '函数参考',
  'Gatsby': 'Gatsby',
  'Icons': '图标',
  'Javascript': 'JavaScript',
  'Jest': 'Jest',
  'Llms': 'LLMs',
  'Next': 'Next.js',
  'Polymorphic': '多态组件',
  'ReactRouter': 'React Router',
  'Redwood': 'Redwood',
  'Storybook': 'Storybook',
  'Typescript': 'TypeScript',
  'Vite': 'Vite',
  'Vitest': 'Vitest',
  // styles extras
  'CssVariablesList': 'CSS 变量清单',
  // charts extras（中文 title 的情况，subtitle 改为英文副标题）
  '图表入门': 'Charts Getting Started',
};

let modified = 0;
let noSubtitleNeeded = 0;
let noMapping = [];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/^title:\s*(.+)$/m);
  const subtitleMatch = content.match(/^subtitle:\s*(.+)$/m);

  if (!titleMatch || !subtitleMatch) return;

  const title = titleMatch[1].trim();
  const subtitle = subtitleMatch[1].trim();

  // 仅当 title 与 subtitle 相同时才需要修改
  if (title !== subtitle) return;

  const newSubtitle = titleToSubtitle[title];
  if (!newSubtitle) {
    noMapping.push({ file: path.relative(docsDir, filePath), title });
    return;
  }

  // 替换 subtitle 行
  const newContent = content.replace(
    /^(subtitle:\s*).+$/m,
    `$1${newSubtitle}`
  );

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    modified++;
  }
}

function walk(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (item.endsWith('.zh-CN.md')) {
      processFile(fullPath);
    }
  }
}

walk(docsDir);

console.log(`\n✅ 修改完成: ${modified} 个文件`);
console.log(`⚠️  无 subtitle 映射的 title（需要手动处理）: ${noMapping.length} 个`);
noMapping.slice(0, 30).forEach(({ file, title }) => {
  console.log(`   - ${file} (title: ${title})`);
});
if (noMapping.length > 30) {
  console.log(`   ... and ${noMapping.length - 30} more`);
}
