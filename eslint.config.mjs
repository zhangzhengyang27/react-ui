import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        // 全局忽略构建产物和依赖
        ignores: [
            'apps/**/*/{tmp,.dumi}/**/*',
            '*.js',
            '**/*/build/**/*',
            'packages/**/es/**/*',
            '**/*/dist/**/*',
            '**/.next/**/*',
            '**/next-env.d.ts',
            'packages/ui/src/components/Menubar/**/*',
            'packages/ui/src/components/Tree/**/*',
            // Story 文件仅供本地开发调试，不参与 lint，避免 monorepo 范围过大导致 ESLint OOM
            '**/*.story.tsx',
            '**/*.stories.tsx',
        ]
    },
    {
        // 继承的配置（使用非 type-aware 的 recommended，避免为每个 tsconfig 加载 TS Program 导致 OOM）
        extends: [js.configs.recommended, ...tseslint.configs.recommended, reactHooks.configs['recommended-latest']],
        // 使用配置的文件
        files: ['**/*.{ts,tsx,js}'],
        // 语言选项
        languageOptions: {
            // 使用的解析器
            parser: tseslint.parser
        },
        rules: {
            // react-hooks/exhaustive-deps 保持 recommended 的 warn；rules-of-hooks 保持 error，
            // 全仓现在只剩 1 处就地豁免：use-form-watch.ts:34（watch() 内部调 useEffect）。
            // 那是 form.watch(field, cb) 这个 API 形状本身决定的——订阅 effect 必须挂在
            // 调用方组件上，改成顶层 useWatch(field, cb) 才是干净解，但那是 API 面变更。
            // 它同时让 exhaustive-deps 分析不到那条 effect，所以 [path, callback] 由
            // form/tests/use-form/watch.test.tsx 的用例守着。
            // 曾经并列的另两处已经治掉：useMatches 不再在 map 里调 hook；
            // emotion-transform 的两个工厂本来就在组件渲染顶层调用，只是名字不像 hook，
            // 改名成 use 前缀后 4 条豁免全部删除（UIStylesTransform 的注释里写清了契约）。
            'react-hooks/rules-of-hooks': 'error',
            // react-hooks/exhaustive-deps 保持 warn，并用 `pnpm lint:es --max-warnings=57`
            // 卡住总量只防增长（棘轮）。不要照着提示逐条"改正"，2026-09-23 实测分类：
            //  1) 表单 getter 的 `useCallback(fn, [xRef.current])` 是**契约**：getter 身份必须随值
            //     变化，否则下游把它当 useMemo/useEffect 依赖时不失效、读到旧值。按提示清成 []
            //     之后 compiler-stability.test.ts 的 10 条用例立刻红。这 9 处已就地 disable 并指向该测试；
            //     另外 3 处（use-form-errors.ts:41、:52、use-form-status.ts:164）把提示要求的依赖补上后
            //     只会改报 "unnecessary dependency"，条数不变，所以留着原样。棘轮下限由这类决定，不是 0。
            //  2) 缺 options/settings 的 11 条（use-floating-window、use-popover、use-tooltip 等）：
            //     **已经列出实际用到的叶子字段**（options.constrainOffset、options.initialPosition?.top …），
            //     比提示要求的整对象更精确。调用方传内联对象，改成整 options 会让 effect 每渲染重跑。
            //  3) 缺 ctx/popover/combobox/modals/form 等 context·store 对象的 13 条：对象每渲染新建。
            //     Popover/HoverCard.Target 与 ComboboxOption 已改为只列对象里的稳定标量
            //     （uid、instanceId、label…）并就地 disable 说明原因。
            //  4) 长尾：每渲染新建的普通闭包（DataTable getRowKey、Combobox getNextActiveIndex、
            //     FloatingIndicator updatePosition、Splitter panels…）、use-did-update/use-shallow-effect
            //     这种"依赖表本身是变量或展开"静态检查看不懂的写法，以及 docs demo 里 mount-only 的用法。
            //  5) use-field.ts:197 的 `_validate`：它在该回调**下面**才声明，写进依赖数组会在渲染期
            //     触发 TDZ（tsc TS2448）。exhaustive-deps 不看声明顺序，这条永远不能照提示做。
            // 已确认稳定、可机械补齐的（useState setter、useEffectEvent、useUncontrolled 的 setter、
            // useDisclosure 的 close、useCallback(...,[])、模块函数）在 145 → 78 那几轮补掉；
            // 78 → 57 这一轮是把 5 个 form store（values/errors/status/watch/validating）改成
            // "容器稳定 + 成员每渲染赋值"之后，把 19 条 $values/$errors/$status/$watch 补进依赖表
            // （原先补进去等于让全部回调每渲染重建）。顺带查出两个真 bug：useLocalStorage 换 key
            // 后不重读存储值（有反向用例）、Carousel 的 onPreviousSlide/onNextSlide 固化在首帧
            // 闭包里（ui 侧有反向用例；@xiaoye-react/carousel 同样改了，但那个包在 jsdom 下
            // embla 每渲染换身份，用例证不出来，所以没留假用例）。
            // 每渲染新建的普通闭包不要直接补进依赖：会让定时器/effect 每渲染重排。改法是包一层
            // useEffectEvent 再补（通知容器、Carousel 已这么处理），或在依赖行上 disable 写清原因
            // （NumberInput 的 localText：补进去会让受控输入敲 "-"、"1." 时被 valueProp 弹回，
            // 有反向用例守着）。
            // 补依赖时必须逐站点验证"这条告警确实消失、没改出 parse error、也没产生 unnecessary"，
            // 改完还要跑 tsc 和表单全量用例——加一个稳定依赖到相邻的另一个回调上，eslint 不会给
            // 任何信号；而依赖数组里引用后声明的变量，只有 tsc 会拦下来。
            semi: 'off',
            'prefer-const': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off'
        }
    }
)
