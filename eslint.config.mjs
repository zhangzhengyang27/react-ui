import js from '@eslint/js'
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
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        // 使用配置的文件
        files: ['**/*.{ts,tsx,js}'],
        // 语言选项
        languageOptions: {
            // 使用的解析器
            parser: tseslint.parser
        },
        rules: {
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
