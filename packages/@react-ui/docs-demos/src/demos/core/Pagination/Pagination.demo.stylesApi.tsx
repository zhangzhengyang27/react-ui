import { Pagination } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { PaginationStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Pagination } from '@react-ui/ui';

function Demo() {
  return <Pagination total={10}{{props}} />;
}
`;

function Demo(props: any) {
  return <Pagination total={10} {...props} />;
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: PaginationStylesApi,
  component: Demo,
  code,
  centered: true,
};
