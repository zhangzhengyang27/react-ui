import { Box, BoxProps, ElementProps } from '@react-ui/ui';

export function Content(props: BoxProps & ElementProps<'div'>) {
  return (
    <Box
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        fontSize: 'var(--ui-font-size-lg)',
      }}
      {...props}
    />
  );
}
