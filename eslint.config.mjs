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
            // react-hooks/exhaustive-deps 保持 recommended 的 warn；rules-of-hooks 里
            // useMatches（map 里调 hook）与 useFormWatch（watch 回调里调 useEffect）
            // 是真的违反规则，emotion-transform 是"从 hook 里返回会调 hook 的函数"的
            // 工厂写法——三处都需要按行为改动来治，暂时降到 warn 以免挡门禁，
            // 但保持可见（pnpm lint 会列出）。
            'react-hooks/rules-of-hooks': 'error',
            // react-hooks/exhaustive-deps 保持 warn，并用 `pnpm lint:es --max-warnings=78`
            // 卡住总量只防增长（棘轮）。不要照着提示逐条"改正"，2026-09-22 实测分类：
            //  1) `useCallback(fn, [valueRef.current])` 是**契约**：表单 getter 的身份必须随值
            //     变化，否则下游把它当 useMemo/useEffect 依赖时不失效、读到旧值。按提示清成 []
            //     之后 compiler-stability.test.ts 的 10 条用例立刻红。这 9 处已就地 disable 并指向该测试。
            //     同族的 `[errorsState]`（use-form-errors.ts:41、:52）一旦把提示要求的依赖补上，
            //     反而会改报 "unnecessary dependency: errorsState"，条数不减；棘轮下限由此类决定。
            //  2) 缺 $values/$errors/$status/$watch 的 19 条：这些 store 是 `return {...}` 裸字面量
            //     （use-form-values/status/errors 都没有 useMemo），列进依赖等于让全部回调失效。
            //     要清必须先把 store 做成稳定身份，属架构改动。
            //  3) 缺 options/settings 的 11 条（use-floating-window、use-popover、use-tooltip 等）：
            //     **已经列出实际用到的叶子字段**（options.constrainOffset、options.initialPosition?.top …），
            //     比提示要求的整对象更精确。调用方传内联对象，改成整 options 会让 effect 每渲染重跑。
            //  4) 缺 ctx/popover/combobox/modals/form 等 context·store 对象的 13 条：对象每渲染新建。
            //     Popover/HoverCard.Target 与 ComboboxOption 已改为只列对象里的稳定标量
            //     （uid、instanceId、label…）并就地 disable 说明原因。
            //  5) 长尾 35 条：每渲染新建的普通闭包（DataTable getRowKey、Combobox getNextActiveIndex、
            //     FloatingIndicator updatePosition、Splitter panels…）、use-did-update/use-shallow-effect
            //     这种"依赖表本身是变量或展开"静态检查看不懂的写法，以及 docs demo 里 mount-only 的用法。
            // 已确认稳定、可机械补齐的（useState setter、useEffectEvent、useUncontrolled 的 setter、
            // useDisclosure 的 close、useCallback(...,[])、模块函数）已在 145 → 78 这几轮补掉，
            // 顺带查出并修掉两个真 bug：useLocalStorage 换 key 后不重读存储值（create-storage.ts，
            // 有反向用例）、Carousel 的 onPreviousSlide/onNextSlide 被固化在首帧闭包里（ui 侧有反向用例，
            // @xiaoye-react/carousel 同样改了，但那个包在 jsdom 下 embla 每渲染换身份，用例证明不了什么）。
            // 每渲染新建的普通闭包不要直接补进依赖：会让定时器/effect 每渲染重排。改法是包一层
            // useEffectEvent 再补（通知容器、Carousel 已这么处理），或在依赖行上 disable 写清原因
            // （NumberInput 的 localText：补进去会让受控输入敲 "-"、"1." 时被 valueProp 弹回，
            // 有反向用例守着）。
            // 补依赖时必须逐站点验证"这条告警确实消失、没改出 parse error、也没产生 unnecessary"——
            // 加一个稳定依赖到相邻的另一个回调上，eslint 不会给任何信号；改完还要跑 tsc，
            // 否则数组括号写坏了 lint 和测试都看不出来。
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
