import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config({
    // 继承的配置
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // 使用配置的文件
    files: ['**/*.{ts,tsx,js}'],
    // 忽略配置的文件
    ignores: [
        'apps/**/*/{tmp,.dumi}/**/*',
        '*.js',
        '**/*/build/**/*',
        '**/*/es/**/*',
        '**/*/dist/**/*'
    ],
    // 语言选项
    languageOptions: {
        // 使用的解析器
        parser: tseslint.parser,
        // 转换选项
        parserOptions: {
            // ts 项目的 tsconfig 文件位置
            project: ['./tsconfig.eslint.json', '**/*/tsconfig.json'],
            // ts 配置的根目录
            tsconfigRootDir: import.meta.dirname
        }
    },
    rules: {
        semi: 'error',
        'prefer-const': 'error'
    }
})