import { UIProvider } from '@xiaoye-react/ui';
import { Notifications } from '@xiaoye-react/notifications';
import ModalsProviderDemo from '../.dumi/theme/builtins/ModalsProviderDemo';
import { Demo, UIDemo } from '@xiaoye-react/demo';

export function renderDemo(demo: UIDemo) {
  return () => (
    <UIProvider>
      {/* 通知/弹窗类 demo 的全局渲染器：store 为空时不渲染任何内容，对普通 demo 无影响 */}
      <Notifications position="top-right" />
      <ModalsProviderDemo>
        <div
          style={{
            paddingTop: 40,
            paddingBottom: 40,
            maxWidth: 820,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Demo data={demo} />
        </div>
      </ModalsProviderDemo>
    </UIProvider>
  );
}
