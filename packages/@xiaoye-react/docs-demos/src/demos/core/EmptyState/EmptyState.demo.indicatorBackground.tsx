import { ShoppingCartSimpleIcon } from '@phosphor-icons/react/dist/csr/ShoppingCartSimple'
import { Button, EmptyState } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

function Demo() {
    return (
        <EmptyState withIndicatorBackground icon={<ShoppingCartSimpleIcon />} title="购物车为空">
            <EmptyState.Description>
                Your shopping cart is empty right now. Browse our catalog and add the items you like to get started with
                your first order.
            </EmptyState.Description>
            <EmptyState.Actions>
                <Button variant="default">浏览产品</Button>
            </EmptyState.Actions>
        </EmptyState>
    )
}

const code = `
import { Button, EmptyState } from '@xiaoye-react/ui';
import { ShoppingCartSimpleIcon } from '@phosphor-icons/react/dist/csr/ShoppingCartSimple';
function Demo() {
  return (
    <EmptyState withIndicatorBackground icon={<ShoppingCartSimpleIcon />} title="购物车为空">
      <EmptyState.Description>
        Your shopping cart is empty right now. Browse our catalog and add the items you like to get
        started with your first order.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="default">浏览产品</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}
`

export const indicatorBackground: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true,
    maxWidth: 440
}
