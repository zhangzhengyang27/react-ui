/* oxlint-disable no-console */
import { useMemo, useState } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { Badge, Button, Center, Group, Text } from '@xiaoye-react/ui'
import { createSpotlight, Spotlight } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { useState } from 'react';
import { Spotlight, spotlight } from '@xiaoye-react/ui';
import { Badge, Button, Center, Group, Text } from '@xiaoye-react/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
const data = [
  {
    image: '/demo/images/futurama-bender.png',
    title: 'Bender Bending Rodríguez',
    description: '对烹饪很着迷，但没有味觉',
    new: true,
  },

  {
    image: '/demo/images/futurama-mom.png',
    title: 'Carol Miller',
    description: '地球上最富有的人之一',
    new: false,
  },
  {
    image: '/demo/images/homer-simpson.png',
    title: 'Homer Simpson',
    description: '超重、懒惰且常常无知',
    new: false,
  },
  {
    image: '/demo/images/spongebob-squarepants.png',
    title: 'Spongebob Squarepants',
    description: '不仅仅是海绵',
    new: false,
  },
];

function Demo() {
  const [query, setQuery] = useState('');

  const items = data
  .filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()))
  .map((item) => (
    <Spotlight.Action key={item.title} onClick={() => console.log(item)}>
      <Group wrap="nowrap" w="100%">
        {item.image && (
          <Center>
            <img src={item.image} alt={item.title} width={50} height={50} />
          </Center>
        )}

        <div style={{ flex: 1 }}>
          <Text>{item.title}</Text>

          {item.description && (
            <Text opacity={0.6} size="xs">
              {item.description}
            </Text>
          )}
        </div>

        {item.new && <Badge variant="default">新</Badge>}
      </Group>
    </Spotlight.Action>
  ));

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
`

const data = [
    {
        image: '/demo/images/futurama-bender.png',
        title: 'Bender Bending Rodríguez',
        description: '对烹饪很着迷，但没有味觉',
        new: true
    },

    {
        image: '/demo/images/futurama-mom.png',
        title: 'Carol Miller',
        description: '地球上最富有的人之一',
        new: false
    },
    {
        image: '/demo/images/homer-simpson.png',
        title: 'Homer Simpson',
        description: '超重、懒惰且常常无知',
        new: false
    },
    {
        image: '/demo/images/spongebob-squarepants.png',
        title: 'Spongebob Squarepants',
        description: '不仅仅是海绵',
        new: false
    }
]

function Demo() {
    const [store, spotlight] = useMemo(createSpotlight, [])
    const [query, setQuery] = useState('')

    const items = data
        .filter(item => item.title.toLowerCase().includes(query.toLowerCase().trim()))
        .map(item => (
            <Spotlight.Action key={item.title} onClick={() => console.log(item)}>
                <Group wrap="nowrap" w="100%">
                    {item.image && (
                        <Center>
                            <img src={item.image} alt={item.title} width={50} height={50} />
                        </Center>
                    )}

                    <div style={{ flex: 1 }}>
                        <Text>{item.title}</Text>

                        {item.description && (
                            <Text opacity={0.6} size="xs">
                                {item.description}
                            </Text>
                        )}
                    </div>

                    {item.new && <Badge variant="default">新</Badge>}
                </Group>
            </Spotlight.Action>
        ))

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
    )
}

export const customAction: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true
}
