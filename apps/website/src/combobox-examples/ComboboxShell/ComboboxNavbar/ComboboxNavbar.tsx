import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { ScrollArea, Text, TextInput } from '@react-ui/ui';
import { useHotkeys } from '@react-ui/hooks';
import { COMBOBOX_EXAMPLES_DATA } from '@react-ui/docs-demos';
import { ComboboxLinksGroup } from './ComboboxLinksGroup/ComboboxLinksGroup';
import { getGroupedData } from './get-grouped-data';
import classes from './ComboboxNavbar.module.css';

interface ComboboxNavbarProps {
  opened: boolean;
  onClose: () => void;
}

export function ComboboxNavbar({ opened, onClose }: ComboboxNavbarProps) {
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const splittedSearch = search
    .toLowerCase()
    .split(' ')
    .filter((item) => item.trim().length > 0);

  const filteredData = COMBOBOX_EXAMPLES_DATA.filter((item) => {
    const splittedName = item.name
      .toLowerCase()
      .split(' ')
      .filter((part) => part.trim().length > 0);
    const splittedDescription = item.description
      .toLowerCase()
      .split(' ')
      .filter((part) => part.trim().length > 0);

    return splittedSearch.every(
      (part) =>
        splittedName.some((name) => name.includes(part)) ||
        splittedDescription.some((name) => name.includes(part)) ||
        item.type.includes(part)
    );
  });

  const groupedData = getGroupedData(filteredData);

  const groups = groupedData.map((item) => (
    <ComboboxLinksGroup
      data={item}
      key={item.group}
      searchQuery={search}
      onClose={onClose}
    />
  ));

  useHotkeys([['mod + shift + k', () => searchInputRef.current?.focus()]], []);

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector('[data-navbar-link-active]')
        ?.scrollIntoView({ block: 'center', behavior: 'instant' });
    }, 500);
  }, []);

  return (
    <nav className={classes.navbar} data-hidden={!opened || undefined}>
      <TextInput
        placeholder="Ctrl + Shift + K 搜索"
        classNames={{ root: classes.search, input: classes.searchInput }}
        leftSection={<MagnifyingGlassIcon className={classes.searchIcon} />}
        radius="md"
        size="md"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        ref={searchInputRef}
      />

      <ScrollArea className={classes.scroll} type="scroll" scrollbarSize={6}>
        {groups}
        <Text className={classes.empty}>未找到...</Text>
      </ScrollArea>
    </nav>
  );
}
