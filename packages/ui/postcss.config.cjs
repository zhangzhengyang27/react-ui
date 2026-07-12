const nested = require('postcss-nested');

/**
 * Custom auto-rem plugin: converts px values to scaled rem.
 * Replaces postcss-preset-mantine's autoRem feature.
 *
 * Behavior:
 * - Processes declarations whose value contains 'px'
 * - Skips 'content' property
 * - Splits value by comma then space, converts each part
 * - Skips parts containing calc(, var(, rgba(, etc.
 * - Converts Npx to calc(N/16rem * var(--ui-scale))
 */
function autoRem() {
    const skipPatterns = /calc\(|clamp\(|rgba?\(|var\(|min\(|max\(|url\(|gradient\(/;

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
