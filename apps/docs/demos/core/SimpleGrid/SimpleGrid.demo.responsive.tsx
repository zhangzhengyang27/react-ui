import { SimpleGrid } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { defaultItems } from './_demo-item';

const code = `
import { SimpleGrid } from '@react-ui/ui';

function Demo() {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 5 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
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
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 5 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      {defaultItems}
    </SimpleGrid>
  );
}

export const responsive: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
