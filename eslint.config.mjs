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
            // react-hooks/exhaustive-deps 保持 warn，并用 `pnpm lint:es --max-warnings=145`
            // 卡住总量只防增长（棘轮）。别照着它逐条"改正"，实测原因：
            //  1) 表单里 `useCallback(fn, [valueRef.current])` 是**契约**——getter 身份必须
            //     随值变化，否则下游 memoization 不失效而读到旧值。按建议清成 [] 后
            //     compiler-stability.test.ts 的 10 条用例立刻红（2026-09-22 亲测）。
            //     这 9 处已就地 disable 并指向该测试。
            //  2) 大量 missing dep 是 $values/$errors/$status/$watch 这类 store 对象，
            //     它们是**每渲染新建的字面量**（use-form-values 等都没有 useMemo），
            //     列进依赖等于让所有回调身份失效；源码里已有作者的手写论证注释。
            //  3) 剩下的（如缺 mode 这类原始值）才可能是真问题，需要逐个连测试判定。
            // 真要清债，先给 store 加稳定身份，再谈补依赖。
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
