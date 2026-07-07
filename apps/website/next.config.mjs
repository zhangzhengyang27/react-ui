import nextra from 'nextra'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const withNextra = nextra({
    contentDirBasePath: '/',
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'docs-dist',
    images: {
        unoptimized: true,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@react-ui/ui': path.join(__dirname, '../../packages/ui/src/index.ts'),
            '@react-ui/hooks': path.join(__dirname, '../../packages/hooks/src/index.ts'),
        }
        return config
    },
}

export default withNextra(nextConfig)
