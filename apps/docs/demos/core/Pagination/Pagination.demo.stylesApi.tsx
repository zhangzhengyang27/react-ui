import { Pagination, PaginationProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { PaginationStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Pagination } from '@xiaoye-react/ui';

function Demo() {
  return <Pagination total={10}{{props}} />;
}
`;

function Demo(props: Omit<PaginationProps, 'total'>) {
  return <Pagination total={10} {...props} />;
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: PaginationStylesApi,
  component: Demo,
  code,
  centered: true,
};
