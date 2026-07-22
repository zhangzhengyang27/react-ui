# @react-ui/hooks

> 小叶的 React Hooks 库，为 [@react-ui/ui](https://www.npmjs.com/package/@react-ui/ui) 提供底层 hooks 支持，也可独立使用。

## 简介

`@react-ui/hooks` 是一个包含 60+ 个 React hooks 的工具库，覆盖以下场景：

- **状态管理**：`useToggle`、`useCounter`、`useMap`、`useSet`、`useListState`、`useSetState`、`useQueue`、`usePrevious`、`useStateHistory`
- **表单与非受控**：`useUncontrolled`、`useInputState`、`useDisclosure`、`useValidatedState`
- **交互手势**：`useClickOutside`、`useHover`、`useMove`、`useRadialMove`、`useDrag`、`useLongPress`、`useHotkeys`
- **浏览器 API**：`useEventListener`、`useWindowEvent`、`useWindowScroll`、`useViewportSize`、`useMediaQuery`、`useNetwork`、`useOrientation`、`usePageLeave`、`useFullscreen`、`useClipboard`、`useFavicon`、`useDocumentTitle`、`useDocumentVisibility`、`useEyeDropper`、`useFileDialog`
- **定时与节流**：`useInterval`、`useTimeout`、`useDebouncedCallback`、`useDebouncedState`、`useDebouncedValue`、`useThrottledCallback`、`useThrottledState`、`useThrottledValue`
- **元素观察**：`useIntersection`、`useMutationObserver`、`useResizeObserver`、`useInViewport`、`useScrollIntoView`、`useScrollSpy`、`useScrollDirection`
- **焦点与键盘**：`useFocusTrap`、`useFocusReturn`、`useFocusWithin`、`useId`、`useMergedRef`、`useRovingIndex`
- **存储**：`useLocalStorage`、`useSessionStorage`、`useHash`
- **其他**：`useFetch`、`useMounted`、`useForceUpdate`、`useIsFirstRender`、`useLogger`、`useIdle`、`useShallowEffect`、`useDidUpdate`、`useEffectEvent`、`useSplitter`

## 安装

```bash
pnpm add @react-ui/hooks
# 或
npm install @react-ui/hooks
```

## 使用

```tsx
import { useDisclosure, useToggle, useLocalStorage } from '@react-ui/hooks'

function Demo() {
    const [opened, { open, close, toggle }] = useDisclosure()
    const [theme, cycleTheme] = useToggle(['light', 'dark', 'system'] as const)
    const [token, setToken] = useLocalStorage('token', '')

    return (
        <>
            <button onClick={toggle}>打开/关闭</button>
            <button onClick={() => cycleTheme()}>切换主题：{theme}</button>
        </>
    )
}
```

## 技术栈

- React 19+（向下兼容 React 18）
- TypeScript 5.5+
- Vite 5（构建产物为 ES Modules + 类型声明）
- Vitest（测试）

## License

MIT
