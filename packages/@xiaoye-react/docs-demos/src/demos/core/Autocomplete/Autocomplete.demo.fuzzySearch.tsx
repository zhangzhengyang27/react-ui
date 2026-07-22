import Fuse from 'fuse.js';
import { Autocomplete, ComboboxItem, OptionsFilter } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Autocomplete, ComboboxItem, OptionsFilter } from '@xiaoye-react/ui';
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
    <Autocomplete
      label="你最喜欢的库"
      placeholder="选择值或输入任意内容"
      data={['React', 'Angular', 'Vue', 'Svelte', 'Ember']}
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
    <Autocomplete
      label="你最喜欢的库"
      placeholder="选择值或输入任意内容"
      data={['React', 'Angular', 'Vue', 'Svelte', 'Ember']}
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
