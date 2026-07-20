import { useEffect } from 'react';

const GA_TRACKING_ID = 'G-4Z4NNVLRH5';

/**
 * Google Analytics 脚本注入。
 * 替代 Next.js 的 <Script> 组件，使用 useEffect 动态注入。
 */
export function GaScript() {
  useEffect(() => {
    // 避免重复注入
    if (document.querySelector(`script[src*="${GA_TRACKING_ID}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}');
    `;
    document.head.appendChild(inlineScript);
  }, []);

  return null;
}

export default GaScript;
