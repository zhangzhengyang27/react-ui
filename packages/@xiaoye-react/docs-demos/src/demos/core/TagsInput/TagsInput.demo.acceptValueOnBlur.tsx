import { TagsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <TagsInput
        label="失焦时接受值"
        placeholder="输入文本，然后失焦"
        data={['React', 'Angular', 'Svelte']}
        acceptValueOnBlur
      />
      <TagsInput
        label="失焦时不接受值"
        placeholder="输入文本，然后失焦"
        data={['React', 'Angular', 'Svelte']}
        acceptValueOnBlur={false}
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TagsInput
        label="失焦时接受值"
        placeholder="输入文本，然后失焦"
        data={['React', 'Angular', 'Svelte']}
        acceptValueOnBlur
      />
      <TagsInput
        label="失焦时不接受值"
        placeholder="输入文本，然后失焦"
        data={['React', 'Angular', 'Svelte']}
        acceptValueOnBlur={false}
        mt="md"
      />
    </>
  );
}

export const acceptValueOnBlur: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
