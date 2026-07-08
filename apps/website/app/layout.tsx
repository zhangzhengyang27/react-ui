import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { NextraClientLayout } from '../components/NextraClientLayout'

export const metadata = {
    title: {
        default: '小叶科技 | @react-ui/ui',
        template: '%s | @react-ui/ui'
    },
    description: '小叶科技官方 React UI 组件库'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const pageMap = await getPageMap()

    return (
        <html lang="zh-CN" suppressHydrationWarning>
            <head>
                {/* 阻止浏览器自动化工具注入的 data-trae-ref 属性，避免 React hydration 服务端/客户端属性不一致 */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){function r(){document.querySelectorAll('[data-trae-ref]').forEach(function(e){e.removeAttribute('data-trae-ref');});}r();var p=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(n==='data-trae-ref')return;if(n.startsWith&&n.startsWith('data-trae-ref'))return;p.call(this,n,v);r();};var rmp=Element.prototype.removeAttribute;Element.prototype.removeAttribute=function(n){rmp.call(this,n);};if(typeof MutationObserver!=='undefined'){var o=new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==='attributes'&&m.attributeName==='data-trae-ref'){m.target.removeAttribute('data-trae-ref');}if(m.type==='childList'){m.addedNodes.forEach(function(n){if(n.nodeType===1){if(n.hasAttribute&&n.hasAttribute('data-trae-ref')){n.removeAttribute('data-trae-ref');}n.querySelectorAll&&n.querySelectorAll('[data-trae-ref]').forEach(function(e){e.removeAttribute('data-trae-ref');});}});}});});o.observe(document.documentElement,{attributes:true,childList:true,subtree:true,attributeFilter:['data-trae-ref']});}})();`
                    }}
                />
            </head>
            <body suppressHydrationWarning>
                <NextraClientLayout pageMap={pageMap}>{children}</NextraClientLayout>
            </body>
        </html>
    )
}
