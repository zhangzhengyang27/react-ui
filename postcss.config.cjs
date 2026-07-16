const nested = require('postcss-nested');

/**
 * 自定义 auto-rem 插件：将 px 数值转换为基于 --ui-scale 的缩放 rem。
 * 与 packages/ui/postcss.config.cjs 保持一致，替代 postcss-preset-ui 的 autoRem。
 */
function autoRem() {
    const skipPatterns = /calc\(|clamp\(|rgba?\(|var\(|min\(|max\(|url\(|gradient\(|color-mix\(/;

    function convertPart(part) {
        if (skipPatterns.test(part)) return part;

        const pxMatch = part.match(/^(-?\d+(?:\.\d+)?)px$/);
        if (pxMatch) {
            const num = parseFloat(pxMatch[1]);
            if (num === 0) return '0rem';
            return `calc(${num / 16}rem * var(--ui-scale))`;
        }

        return part;
    }

    function convertValue(value) {
        if (skipPatterns.test(value)) return value;
        if (value.includes(',')) {
            return value.split(',').map(convertValue).join(',');
        }
        if (value.includes(' ')) {
            return value.split(' ').map(convertPart).join(' ');
        }
        return convertPart(value);
    }

    return {
        postcssPlugin: 'postcss-auto-rem',
        Declaration(decl) {
            if (!decl.value.includes('px')) return;
            if (decl.prop === 'content') return;
            decl.value = convertValue(decl.value);
        }
    };
}
autoRem.postcss = true;

module.exports = {
    plugins: [
        nested(),
        autoRem()
    ]
};
