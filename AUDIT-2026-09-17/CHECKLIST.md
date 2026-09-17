# 审查清单与产出规范(所有批次共用)

## 12 条 checklist(每文件逐项过)

1. **正确性**:逻辑错误、边界条件(空/null/0/负数/NaN/超长/单元素)、off-by-one、除零。
2. **React 语义**:stale closure、effect 依赖缺失/多余、async 竞态与过期响应、key 不稳定、ref 时序、SSR 安全(useLayoutEffect/window 访问)、水合告警。
3. **资源泄漏**:定时器、事件监听、Observer(Resize/Mutation/Intersection)、RAF、body 样式锁(userSelect/overflow)在卸载与中断路径上的清理;pointercancel/touchcancel。
4. **受控/非受控**:useUncontrolled 接线、value/onChange/defaultValue 一致性、受控切换不崩。
5. **交互完整性**:键盘导航(roving tabindex)、焦点管理(focus trap/return)、IME 合成事件、指针命中(pointer-events 链)、触摸滚动、拖拽中断恢复。
6. **a11y**:aria 属性真实生效(不挂死值/不恒 false)、role 正确性、aria-label 中英一致性、键盘可达性、可见性判定。
7. **性能**:O(n²) 查找(改 Map/索引)、渲染期重计算未 memo、内联对象/数组进依赖数组导致监听重建、JSON.stringify 比较、context value 身份稳定。
8. **主题/样式**:暗色模式变量选择器方向、CSS 变量拼写与 fallback、getThemeColor 透传、断点排序、RTL(dir/useDirection 接入)。
9. **类型安全**:any 滥用、泛型断链、as 强转掩盖的真实错误、DOM props 透传泄漏。
10. **API 一致性**:实现与 .types.ts 注释/文档不符、死参数(声明了但没接线)、默认值缺失或与 @default 不符。
11. **浮层系专项**:z-index 层叠、Escape 关闭的嵌套协调、Portal 属性同步、autoUpdate 接线、anchor 漂移。
12. **上一轮修复回归**:凡触及 2026-09-13 上轮 199 项修复涉及文件的,先读 `/Users/zhangzhengyang/Desktop/PROJECT/react-ui/AUDIT-REPORT-2026-09-13.md` 中对应条目,确认新代码没把修复冲掉。

## 严重度定义

- **P0** = 明确 bug/崩溃/泄漏/数据破坏
- **P1** = 特定场景功能错误或明显性能问题
- **P2** = 值得做的优化

## 产出格式(写入 raw/BXX.md)

每条问题:

```
[BXX-n] P1 · 组件名 · 一句话标题
位置:相对路径:行号(-行号)
证据:引用真实代码片段(2-6 行)并说明为什么错
建议:修法
回归关联:无(新发现)/ 上轮第N批相关(说明是否被冲掉)
```

## 硬性要求

- **每条问题必须核到 file:line 的真实代码**,先读文件再下结论,拒收推测。
- **不修改任何源码文件**;只写 AUDIT-2026-09-17/raw/ 下的产出。
- 测试显式编码的行为 > 审查者直觉;若发现"实现与测试意图冲突",单独列「待裁决」小节,不进正式问题单。
- 审完的文件在本批次文件清单里全部过一遍;无问题的文件在 raw/BXX.md 末尾列「已审无问题」清单(只列路径)。
- 宁可漏报不可误报:拿不准的写「待核实」并说明不确定的点。
