import Fuse from 'fuse.js';
import { ComboboxItem, OptionsFilter, TagsInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TagsInput, ComboboxItem, OptionsFilter } from '@react-ui/ui';
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
      label="Favorite fruits"
      placeholder="Pick value or enter anything"
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
      label="Favorite fruits"
      placeholder="Pick value or enter anything"
      data={['Apple', 'Banana', 'Kiwi', 'Mango', 'Watermelon', 'Raspberry']}
      filter={optionsFilter}
    />
  );
}

export const fuzzySearch: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
