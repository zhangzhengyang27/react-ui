import { Demo, UIDemo } from '@xiaoye-react/demo';

export function renderDemo(demo: UIDemo) {
  return () => (
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
  );
}
