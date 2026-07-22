import { em, getBreakpointValue } from '@xiaoye-react/ui';
import { createStyles } from '@xiaoye-react/emotion';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { em, getBreakpointValue } from '@xiaoye-react/ui';
import { createStyles } from '@xiaoye-react/emotion';

const useStyles = createStyles((theme, _, u) => ({
  container: {
    height: 100,
    backgroundColor: theme.colors.blue[6],

    // Media query with value from theme
    [\`@media (max-width: \${em(getBreakpointValue(theme.breakpoints.xl, theme.breakpoints) - 1)})\`]: {
      backgroundColor: theme.colors.pink[6],
    },

    // Simplify media query writing with theme functions
    [u.smallerThan('lg')]: {
      backgroundColor: theme.colors.yellow[6],
    },

    // Static media query
    [\`@media (max-width: \${em(800)})\`]: {
      backgroundColor: theme.colors.orange[6],
    },
  },
}));

function Demo() {
  const { classes } = useStyles();
  return <div className={classes.container} />;
}
`;

const useStyles = createStyles((theme, _, u) => ({
  container: {
    height: 100,
    backgroundColor: theme.colors.blue[6],

    // Media query with value from theme
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.xl, theme.breakpoints) - 1)})`]:
      {
        backgroundColor: theme.colors.pink[6],
      },

    // Simplify media query writing with theme functions
    [u.smallerThan('lg')]: {
      backgroundColor: theme.colors.yellow[6],
    },

    // Static media query
    [`@media (max-width: ${em(800)})`]: {
      backgroundColor: theme.colors.orange[6],
    },
  },
}));

function Demo() {
  const { classes } = useStyles();
  return <div className={classes.container} />;
}

export const media: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
