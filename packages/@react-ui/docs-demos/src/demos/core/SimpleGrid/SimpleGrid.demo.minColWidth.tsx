import { SimpleGrid } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { defaultItems } from './_demo-item';

const code = `
import { SimpleGrid } from '@react-ui/ui';

function Demo() {
  return (
    <SimpleGrid minColWidth="200px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  );
}
`;

function Demo() {
  return <SimpleGrid minColWidth="200px">{defaultItems}</SimpleGrid>;
}

export const minColWidth: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
