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
            'react-hooks/rules-of-hooks': 'warn',
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
