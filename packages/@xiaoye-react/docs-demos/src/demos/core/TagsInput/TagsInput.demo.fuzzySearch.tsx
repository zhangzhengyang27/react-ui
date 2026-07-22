import Fuse from 'fuse.js';
import { ComboboxItem, OptionsFilter, TagsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TagsInput, ComboboxItem, OptionsFilter } from '@xiaoye-react/ui';
import Fuse from 'fuse.js';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  if (!search.trim()) {
    return options;
  }

  const fuse = new Fuse(options as ComboboxItem[], {
    keys: ['label'],
    threshold: 0.3,
    minMatchCharLength: 1,
  });

  return fuse.search(search).map((result) => result.item);
};

function Demo() {
  return (
    <TagsInput
      label="喜爱的水果"
      placeholder="选择值或输入任意内容"
      data={['Apple', 'Banana', 'Kiwi', 'Mango', 'Watermelon', 'Raspberry']}
      filter={optionsFilter}
    />
  );
}
`;

const optionsFilter: OptionsFilter = ({ options, search }) => {
  if (!search.trim()) {
    return options;
  }

  const fuse = new Fuse(options as ComboboxItem[], {
    keys: ['label'],
    threshold: 0.3,
    minMatchCharLength: 1,
  });

  return fuse.search(search).map((result) => result.item);
};

function Demo() {
  return (
    <TagsInput
      label="喜爱的水果"
      placeholder="选择值或输入任意内容"
      data={['Apple', 'Banana', 'Kiwi', 'Mango', 'Watermelon', 'Raspberry']}
      filter={optionsFilter}
    />
  );
}

export const fuzzySearch: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
