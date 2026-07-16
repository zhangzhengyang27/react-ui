import { Pagination } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Demo() {
  return <Pagination total={10} />;
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
};
