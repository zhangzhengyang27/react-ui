import { Pagination } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

function Demo() {
  return <Pagination total={10} />;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
};
