---
category: Guides
title: CustomComponents
subtitle: 自定义组件
description: react-ui CustomComponents 文档。
---


## Factory 类型

`Factory` 类型用于将组件相关的所有类型分组：变体、Styles API 选择器、ref 类型、
CSS 变量以及后面介绍的其他属性。除 `props` 外，所有属性都是可选的。


创建的 `ExampleComponentFactory` 随后作为第一个类型参数传递给所有从 `@react-ui/ui` 包导入的辅助函数：
上例中的 `useStyles`、`createVarsResolver` 和 `factory`。

`Factory` 类型用于验证和 IDE 自动补全。它不会修改传入的类型：

```tsx
// 当组件有关联样式时，与 Styles API 一起使用
export type ExampleComponentFactory = Factory<{
  props: ExampleComponentProps;
  ref: HTMLDivElement;
  stylesNames: ExampleComponentStylesNames;
  vars: ExampleComponentCssVariables;
  variant: ExampleComponentVariant;
}>;

// 组件没有样式或不暴露 Styles API 功能
export type ExampleComponentFactory = Factory<{
  props: ExampleComponentProps;
  ref: HTMLDivElement;
}>;
```

```tsx
export type ExampleComponentFactory = {
  props: ExampleComponentProps;
  ref: HTMLDivElement;
};

// 两个示例效果相同，Factory 仅用于验证，可以省略
export type ExampleComponentFactory = Factory<{
  props: ExampleComponentProps;
  ref: HTMLDivElement;
}>;
```

## factory 函数

`factory` 函数用于类型化 props 并分配共享的静态属性：`extend` 和 `withProps`。

```tsx
export const ExampleComponent = factory<ExampleComponentFactory>((_props) => {
  // ... 组件主体
});

// 可选：你可以设置 displayName 和 classes
ExampleComponent.displayName = 'ExampleComponent';
ExampleComponent.classes = classes;
```

## Box 组件

[Box](/components/box) 组件是所有其他组件的基础。要创建自定义组件，请将其作为根元素，
并将 `...others` props 展开到它上面以支持[样式属性](/docs/styles/style-props)。

要为组件添加[样式属性](/docs/styles/style-props)类型，请继承 `BoxProps`。

```tsx
// 使用 `BoxProps` 扩展 props 以添加样式属性类型
export interface ExampleComponentProps
  extends BoxProps, StylesApiProps<ExampleComponentFactory>, ElementProps<'div'> {
}

export const ExampleComponent = factory<ExampleComponentFactory>((_props) => {
  const props = useProps('ExampleComponent', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    attributes,
    radius,
    children,
    ...others
  } = props;

  // 将 ...others props 展开到 Box 组件以支持样式属性
  return (
    <Box {...others}>{children}</Box>
  );
});
```

## ElementProps 类型

`ElementProps` 用于获取组件接受的 props。可以传入字符串表示 DOM 元素（例如 `'div'`、`'span'` 等），
或传入 React 组件类型。第二个类型参数可选，可用于从原始组件/元素中省略某些 prop 类型。

`ElementProps` 会重新分配 `style` prop 的类型签名，使其与 ReactUI 组件兼容，并允许使用 CSS 变量。

`ElementProps` 类型使用示例：

```tsx
// 根元素是 `div`，使用 ElementProps<'div'> 扩展组件 props
export interface ExampleComponentProps extends ElementProps<'div'> {}

// 类型冲突：`input` 元素有 html 属性 `color` 和 `size`，
// 但我们要定义自己的类型。为解决类型冲突，使用第二个类型参数，
// 传入 `'color' | 'size'` 联合类型以从 `input` html props 中省略 color 和 size。
export interface ExampleComponentProps extends ElementProps<'input', 'color' | 'size'> {
  color: 'blue' | 'red';
  size: 'sm' | 'lg';
}
```

## useProps hook

`useProps` hook 用于支持[默认 props](/docs/theming/default-props)。它接受以下参数：
- 组件名称，用于在 [theme](/docs/theming/theme-object) 中引用组件
- 组件级别的默认 props
- 组件 props

`useProps` 按以下顺序合并 props：
1. 组件 props — 最高优先级
2. theme 上的[默认 props](/docs/theming/default-props) — 较低优先级
3. 组件级别定义的默认 props — 仅当前面步骤未定义该 prop 时使用

`useProps` 使用示例：


传递给 `useProps` 的 `defaultProps` 必须使用 `satisfies Partial<ExampleComponentProps>` 类型断言，
才能正确推断 props 类型：


你可以通过以下方式使用 [defaultProps](/docs/theming/default-props)：

```tsx
const defaultProps = {
  radius: 'md',
} satisfies Partial<ExampleComponentProps>;

export const ExampleComponent = factory<ExampleComponentFactory>((_props) => {
  const props = useProps('ExampleComponent', defaultProps, _props);
  // 仅在用 useProps 处理后才解构单个 prop
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    attributes,
    radius,
    children,
    ...others
  } = props;

  // ... 组件主体
});
```

```tsx
export interface ExampleComponentProps
  extends BoxProps, StylesApiProps<ExampleComponentFactory>, ElementProps<'div'> {
  /** 组件圆角 */
  radius?: UIRadius;
}

// ✅ useProps 可以正确推断类型
// `radius` prop 是 `UIRadius`
const defaultProps = {
  radius: 'md',
} satisfies Partial<ExampleComponentProps>;

// ❌ useProps 无法正确推断类型
// `radius` prop 是 `UIRadius | undefined`
const defaultProps: Partial<ExampleComponentProps> = {
  radius: 'md',
};
```

```tsx
import { UIProvider, Button, Group, createTheme } from '@react-ui/ui';
import { ExampleComponent } from './ExampleComponent';

const theme = createTheme({
  components: {
    ExampleComponent: ExampleComponent.extend({
      defaultProps: {
        radius: 'sm',
      },
    }),
  },
});
```

## useStyles hook

`useStyles` hook 用于支持 [Styles API](/docs/styles/styles-api) 功能：
`classNames`、`styles`、`attributes` 和其他相关属性。

`useStyles` 返回 `getStyles` 函数，该函数返回一个应被展开（`{...getStyles('root')}`）到元素上的对象。

```tsx
// 🔝 完整组件代码见上文
const getStyles = useStyles<ExampleComponentFactory>({
  // 组件名称，用于生成静态选择器（.ui-ExampleComponent-root）
  // 以及 theme 对象中 `classNames`、`styles` 的支持
  name: 'ExampleComponent',

  // CSS modules 类，通常直接从 `*.module.css` 文件导入
  classes,

  // 从 `useProps` hook 返回的组件 props，
  // 用于以回调函数形式解析 `classNames` 和 `styles`
  props,

  // 必须将 `className` 和 `style` 传递到的元素
  // 可选，默认值为 `root`
  rootSelector: 'root',

  // className 和 style 会添加到根元素（rootSelector）
  className,
  style,

  // classNames、attributes 和 styles 由 useStyles hook 自动解析
  classNames,
  attributes,
  styles,

  // 如果设置了 unstyled，则 `getStyles` 会省略所有样式
  unstyled,

  // CSS 变量解析器，在组件文件中定义，稍后介绍
  varsResolver,

  // 用户在应用中覆盖的 CSS 变量
  vars,
});
```

## getStyles 函数

`getStyles` 函数由 `useStyles` hook 返回。第一个参数是 Styles API 选择器，
第二个参数可用于向返回对象添加 `className` 或 `style`。

```tsx
<Box {...getStyles('root')}>
  <div {...getStyles('inner', { className: 'custom-class', style: { color: 'red' } })}>
    {children}
  </div>
</Box>
```

## varsResolver

使用 `varsResolver` 将组件 props 转换为 CSS 变量。

`varsResolver` 在 [Button](/components/button) 组件中的使用示例：

```tsx
import { getFontSize, getSize, createVarsResolver } from '@react-ui/ui';

const varsResolver = createVarsResolver<ButtonFactory>(
  (theme, { radius, color, gradient, variant, size, justify, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'filled',
      autoContrast,
    });

    return {
      root: {
        '--button-justify': justify,
        '--button-height': getSize(size, 'button-height'),
        '--button-padding-x': getSize(size, 'button-padding-x'),
        '--button-fz': size?.includes('compact')
          ? getFontSize(size.replace('compact-', ''))
          : getFontSize(size),
        '--button-radius': radius === undefined ? undefined : getRadius(radius),
        '--button-bg': color || variant ? colors.background : undefined,
        '--button-hover': color || variant ? colors.hover : undefined,
        '--button-color': colors.color,
        '--button-bd': color || variant ? colors.border : undefined,
        '--button-hover-color': color || variant ? colors.hoverColor : undefined,
      },
    };
  }
);
```

## 复合组件

复合组件（如 `Button.Group`、`Input.Wrapper` 等）作为主组件的静态属性定义，
并在主组件 factory 中分配类型。

[Tabs](/components/tabs) 组件中分配复合组件的示例：

```tsx
export type TabsFactory = Factory<{
  props: TabsProps;
  ref: HTMLDivElement;
  variant: TabsVariant;
  stylesNames: TabsStylesNames;
  vars: TabsCssVariables;

  // 设置复合组件类型
  staticComponents: {
    Tab: typeof TabsTab;
    Panel: typeof TabsPanel;
    List: typeof TabsList;
  };
}>;

export const Tabs = factory<TabsFactory>((_props) => {
  // ... 组件主体
});

// 分配复合组件
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.List = TabsList;
```

## 命名空间导出

ReactUI 组件支持命名空间导出，以将相关类型与组件分组。
例如，`Button` 组件将相关类型导出为 `Button.*`：


要实现此功能，请在组件文件或 `index.ts` 末尾添加命名空间导出。
[Button](/components/button) 组件命名空间导出示例：

```tsx
import { Button } from '@react-ui/ui';

// Props 类型，无需单独导入
type Props = Button.Props;
```

```tsx
export namespace Button {
  export type Props = ButtonProps;
  export type StylesNames = ButtonStylesNames;
  export type CssVariables = ButtonCssVariables;
  export type Factory = ButtonFactory;
  export type Variant = ButtonVariant;
  export type Size = ButtonSize;

  export namespace Group {
    export type Props = ButtonGroupProps;
    export type StylesNames = ButtonGroupStylesNames;
    export type CssVariables = ButtonGroupCssVariables;
    export type Factory = ButtonGroupFactory;
  }

  export namespace GroupSection {
    export type Props = ButtonGroupSectionProps;
    export type StylesNames = ButtonGroupSectionStylesNames;
    export type CssVariables = ButtonGroupSectionCssVariables;
    export type Factory = ButtonGroupSectionFactory;
  }
}
```

## polymorphicFactory

`polymorphicFactory` 用于创建[多态组件](/docs/guides/polymorphic)。
如果你需要改变根元素，请使用 `polymorphicFactory` 替代 `factory`。
例如，[Button](/components/button) 组件就是多态的：默认根元素是 `button`，
但可以使用 `component` 和 `renderRoot` 属性将其改为 `a` 或任何其他元素。

`polymorphicFactory` 仅操作类型，与 `factory` 相比不会修改组件行为。
使用 `polymorphicFactory` 创建的组件类型会增加 TypeScript 开销并降低 IDE 自动补全速度，仅在必要时使用。

完整的多态组件示例：

```tsx
import {
  Box,
  BoxProps,
  createVarsResolver,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@react-ui/ui';
import classes from './PolymorphicExample.module.css';

export type PolymorphicExampleStylesNames = 'root';
export type PolymorphicExampleVariant = string;
export type PolymorphicExampleCssVariables = {
  root: '--test';
};

export interface PolymorphicExampleProps
  extends BoxProps, StylesApiProps<PolymorphicExampleFactory> {}

export type PolymorphicExampleFactory = PolymorphicFactory<{
  props: PolymorphicExampleProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: PolymorphicExampleStylesNames;
  vars: PolymorphicExampleCssVariables;
  variant: PolymorphicExampleVariant;
}>;

const defaultProps = {} satisfies Partial<PolymorphicExampleProps>;

const varsResolver = createVarsResolver<PolymorphicExampleFactory>(() => ({
  root: {
    '--test': 'test',
  },
}));

export const PolymorphicExample = polymorphicFactory<PolymorphicExampleFactory>((_props) => {
  const props = useProps('PolymorphicExample', defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, attributes, ...others } = props;

  const getStyles = useStyles<PolymorphicExampleFactory>({
    name: 'PolymorphicExample',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver,
  });

  return <Box {...getStyles('root')} {...others} />;
});

PolymorphicExample.displayName = '@react-ui/ui/PolymorphicExample';
```

## genericFactory

使用 `genericFactory` 创建接受泛型类型参数的组件。
例如，[Accordion](/components/accordion) 组件的 `value` 和 `onChange` props 类型
取决于 `multiple` prop 的值。

```tsx
type AccordionValue<Multiple extends boolean> = Multiple extends true
  ? string[]
  : string | null;

// 定义带泛型类型参数的 props 接口
export interface AccordionProps<Multiple extends boolean = false>
  extends
    BoxProps,
    StylesApiProps<AccordionFactory>,
    ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
  // 依赖于泛型类型参数的 props
  multiple?: Multiple;
  value?: AccordionValue<Multiple>;
  defaultValue?: AccordionValue<Multiple>;
  onChange?: (value: AccordionValue<Multiple>) => void;

  // ... 其他 props
}
export type AccordionFactory = Factory<{
  // 带泛型类型参数的签名
  signature: <Multiple extends boolean = false>(
    props: AccordionProps<Multiple>
  ) => React.JSX.Element;

  // 其他属性与普通 factory 相同
  props: AccordionProps;
  ref: HTMLDivElement;
  // ...
}>;
```
