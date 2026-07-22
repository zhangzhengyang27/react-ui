import { createStyles, keyframes } from '@xiaoye-react/emotion';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { createStyles, keyframes } from '@xiaoye-react/emotion';

// Export animation to reuse it in other components
export const bounce = keyframes({
  'from, 20%, 53%, 80%, to': { transform: 'translate3d(0, 0, 0)' },
  '40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
  '70%': { transform: 'translate3d(0, -15px, 0)' },
  '90%': { transform: 'translate3d(0, -4px, 0)' },
});

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing.xl,
    animation: \`\${bounce} 3s ease-in-out infinite\`,
  },
}));

function Demo() {
  const { classes } = useStyles();
  return <div className={classes.container}>关键帧演示</div>;
}
`;

const bounce = keyframes({
  'from, 20%, 53%, 80%, to': { transform: 'translate3d(0, 0, 0)' },
  '40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
  '70%': { transform: 'translate3d(0, -15px, 0)' },
  '90%': { transform: 'translate3d(0, -4px, 0)' },
});

const useStyles = createStyles((theme, _, u) => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing.xl,
    animation: `${bounce} 3s ease-in-out infinite`,

    [u.light]: { color: theme.black },

    [u.dark]: { color: theme.white },
  },
}));

function Demo() {
  const { classes } = useStyles();
  return <div className={classes.container}>关键帧演示</div>;
}

export const _keyframes: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
