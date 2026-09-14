import { useEffect, useState } from 'react';
import cx from 'clsx';
import { CodeHighlightTabs } from '@xiaoye-react/ui';
import { Badge, RemoveScroll, Text } from '@xiaoye-react/ui';
import { getCodeFileIcon } from '@xiaoye-react/dev-icons';
import { COMBOBOX_EXAMPLES_DATA } from '../combobox-examples-data';
import { COMBOBOX_EXAMPLES_COMPONENTS, ComboboxExampleId } from '../examples';
import classes from './ComboboxDemo.module.css';

// 替代迁移前 next/router 的用法：直接读写 URL 查询参数（dumi 环境无 next/router）。
// 首帧固定渲染 null 与 SSR 输出保持一致，参数同步放在 effect 中避免水合不一致。
export function ComboboxDemo() {
  const [id, setId] = useState<ComboboxExampleId | undefined>(undefined);
  const codeData = COMBOBOX_EXAMPLES_COMPONENTS[id];
  const metaData = COMBOBOX_EXAMPLES_DATA.find((item) => item.id === id);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('e') as ComboboxExampleId | null;
    if (fromUrl && fromUrl in COMBOBOX_EXAMPLES_COMPONENTS) {
      setId(fromUrl);
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set('e', 'BasicSelect');
    window.history.replaceState(null, '', url);
    setId('BasicSelect');
  }, []);

  if (!codeData || !metaData) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={cx(classes.preview, RemoveScroll.classNames.zeroRight)}>
        <div className={classes.header}>
          <div className={classes.headerBody}>
            <Text className={classes.title}>{metaData.name}</Text>
            <Text className={classes.description}>
              {metaData.fullDescription || metaData.description}
            </Text>
          </div>

          <Badge variant="light">{metaData.type}</Badge>
        </div>
        <div className={classes.inner}>
          <div className={classes.wrapper}>
            <codeData.component />
          </div>
        </div>
      </div>
      <div className={classes.code}>
        <CodeHighlightTabs code={codeData.code} getFileIcon={getCodeFileIcon} />
      </div>
    </div>
  );
}
