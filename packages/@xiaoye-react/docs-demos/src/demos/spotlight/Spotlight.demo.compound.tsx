import { useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Button } from '@xiaoye-react/ui';
import { createSpotlight, Spotlight } from '@xiaoye-react/spotlight';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Spotlight, spotlight } from '@xiaoye-react/spotlight';
import { Button } from '@xiaoye-react/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const data = ['Home', 'About us', 'Contacts', 'Blog', 'Careers', 'Terms of service'];

function Demo() {
  const [query, setQuery] = useState('');

  const items = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => <Spotlight.Action key={item} label={item} />);

  return (
    <>
      <Button onClick={spotlight.open}>打开聚光灯</Button>

      <Spotlight.Root query={query} onQueryChange={setQuery}>
        <Spotlight.Search placeholder="搜索..." leftSection={<MagnifyingGlassIcon />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>未找到...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}
`;

const data = ['Home', 'About us', 'Contacts', 'Blog', 'Careers', 'Terms of service'];

function Demo() {
  const [store, spotlight] = useMemo(createSpotlight, []);
  const [query, setQuery] = useState('');

  const items = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => <Spotlight.Action key={item} label={item} />);

  return (
    <>
      <Button onClick={spotlight.open}>打开聚光灯</Button>

      <Spotlight.Root store={store} query={query} onQueryChange={setQuery} shortcut={null}>
        <Spotlight.Search placeholder="搜索..." leftSection={<MagnifyingGlassIcon />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>未找到...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}

export const compound: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
