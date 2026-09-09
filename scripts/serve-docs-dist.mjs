// 零依赖静态服务器：用于 Playwright 截图回归时托管 docs 构建产物（apps/docs/dist）。
// dumi 构建产物为目录型静态站点（每路由一个 index.html），无需 SPA fallback。
import { createServer } from 'node:http'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../apps/docs/dist', import.meta.url))
const port = Number(process.env.PORT || 4173)

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.map': 'application/json'
}

const server = createServer(async (req, res) => {
    try {
        const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`)
        let filePath = path.join(root, decodeURIComponent(url.pathname))

        // 防路径穿越
        if (!filePath.startsWith(root)) {
            res.writeHead(403)
            res.end('Forbidden')
            return
        }

        const stat = await fs.stat(filePath).catch(() => null)
        if (stat?.isDirectory()) {
            filePath = path.join(filePath, 'index.html')
        }

        const content = await fs.readFile(filePath).catch(() => null)
        if (!content) {
            res.writeHead(404)
            res.end('Not Found')
            return
        }

        res.writeHead(200, {
            'Content-Type': MIME_TYPES[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream',
            'Cache-Control': 'no-store'
        })
        res.end(content)
    } catch (error) {
        res.writeHead(500)
        res.end(`Server error: ${error}`)
    }
})

server.listen(port, '127.0.0.1', () => {
    console.log(`[serve-docs-dist] serving ${root} at http://127.0.0.1:${port}`)
})
