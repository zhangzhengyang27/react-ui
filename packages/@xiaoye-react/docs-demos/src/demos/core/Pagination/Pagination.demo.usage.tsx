import { Pagination } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Demo() {
  return <Pagination total={10} />;
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
};
