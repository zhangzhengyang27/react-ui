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

module.exports = {
  plugins: {
    'postcss-preset-mantine': {
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
    },
    'postcss-simple-vars': {
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
    },
  },
};
