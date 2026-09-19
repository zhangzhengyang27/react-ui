import type {
  CodeHighlightFactory,
  CodeHighlightTabsFactory,
  InlineCodeHighlightFactory,
} from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const CodeHighlightStylesApi: StylesApiData<CodeHighlightFactory> = {
  selectors: {
    codeHighlight: '根元素',
    showCodeButton: '代码折叠时显示完整代码的按钮',
    pre: 'Pre element, contains code 元素',
    code: 'Code 元素',
    control: 'Control button, copy/collapse, custom controls',
    controlTooltip: '控件提示框的根元素',
    controls: '控件的包装器',
    scrollarea: 'Scroll area, contains code',
    lineNumbers: '行号列',
    codeWrapper: '包裹行号和滚动区域的元素',
  },

  vars: {
    codeHighlight: {
      '--ch-background': '背景颜色',
      '--ch-max-height': '代码块折叠时的最大高度',
      '--ch-radius': '边框圆角',
    },
  },
};

export const CodeHighlightTabsStylesApi: StylesApiData<CodeHighlightTabsFactory> = {
  selectors: {
    ...CodeHighlightStylesApi.selectors,
    root: '根元素',
    codeHighlight: 'Root element of inner CodeHighlight 组件',
    filesScrollarea: '带文件列表的滚动区域',
    files: '文件名列表',
    file: '文件名',
    fileIcon: '文件图标',
  },

  vars: {},
};

export const InlineCodeHighlightStylesApi: StylesApiData<InlineCodeHighlightFactory> = {
  selectors: {
    inlineCodeHighlight: '根元素',
  },

  vars: {
    inlineCodeHighlight: {
      '--ch-background': '背景颜色',
      '--ch-radius': '边框圆角',
    },
  },
};
