function colorSchemeMixin(colorScheme, type = 'default') {
  if (type === 'where') {
    return {
      [`:where([data-ui-color-scheme='${colorScheme}']) &`]: {
        '@mixin-content': {},
      },
    };
  }
  return {
    [`[data-ui-color-scheme='${colorScheme}'] &`]: {
      '@mixin-content': {},
    },
  };
}

function rootColorSchemeMixin(colorScheme, type = 'default') {
  if (type === 'where') {
    return {
      [`&:where(:root[data-ui-color-scheme='${colorScheme}'])`]: {
        '@mixin-content': {},
      },
    };
  }
  return {
    [`&[data-ui-color-scheme='${colorScheme}']`]: {
      '@mixin-content': {},
    },
  };
}

/**
 * 后处理插件：将 postcss-preset-mantine autoRem 生成的 var(--mantine-scale)
 * 替换为 var(--ui-scale)，确保缩放变量引用正确。
 * 必须在 postcss-preset-mantine 之后运行。
 */
function replaceMantineScale() {
  return {
    postcssPlugin: 'postcss-replace-mantine-scale',
    Declaration(decl) {
      if (decl.value.includes('--mantine-scale')) {
        decl.value = decl.value.replace(/--mantine-scale/g, '--ui-scale');
      }
    },
  };
}
replaceMantineScale.postcss = true;

module.exports = {
  plugins: [
    require('postcss-preset-mantine')({
      autoRem: true,
      mixins: {
        light: colorSchemeMixin('light'),
        dark: colorSchemeMixin('dark'),
        'light-root': rootColorSchemeMixin('light'),
        'dark-root': rootColorSchemeMixin('dark'),
        'where-light': colorSchemeMixin('light', 'where'),
        'where-dark': colorSchemeMixin('dark', 'where'),
        'where-light-root': rootColorSchemeMixin('light', 'where'),
        'where-dark-root': rootColorSchemeMixin('dark', 'where'),
      },
    }),
    require('postcss-simple-vars')({
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
        'docs-navbar-breakpoint': '47.5em',
        'docs-toc-breakpoint': '78em',
        'docs-mdx-breakpoint': '67.5em',
      },
    }),
    replaceMantineScale(),
  ],
};
