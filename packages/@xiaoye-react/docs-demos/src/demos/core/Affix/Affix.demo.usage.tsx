import { ArrowUpIcon } from '@phosphor-icons/react/dist/csr/ArrowUp'
import { Affix, Button, Text, Transition } from '@xiaoye-react/ui'
import { useWindowScroll } from '@xiaoye-react/hooks'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ArrowUpIcon } from '@phosphor-icons/react/dist/csr/ArrowUp';
import { useWindowScroll } from '@xiaoye-react/hooks';
import { Affix, Button, Text, Transition } from '@xiaoye-react/ui';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Text ta="center">Affix 位于屏幕底部，滚动查看</Text>
      <Affix position={{ bottom: 20, left: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={<ArrowUpIcon size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
`

function Demo() {
    const [scroll, scrollTo] = useWindowScroll()

    return (
        <>
            <Text ta="center">Affix 位于屏幕底部，滚动查看</Text>
            <Affix position={{ bottom: 20, left: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {transitionStyles => (
                        <Button
                            leftSection={<ArrowUpIcon size={16} />}
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            Scroll to top
                        </Button>
                    )}
                </Transition>
            </Affix>
        </>
    )
}

export const usage: UIDemo = {
    type: 'code',
    code,
    component: Demo
}
