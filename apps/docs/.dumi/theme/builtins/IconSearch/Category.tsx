import * as React from 'react';
import { Notifications } from '@xiaoye-react/ui';

import CopyableIcon from './CopyableIcon';
import { categories, type CategoriesKeys, type IconEntry } from './fields';
import classes from './Category.module.css';

interface CategoryProps {
  title: CategoriesKeys;
  icons: IconEntry[];
}

const Category: React.FC<CategoryProps> = (props) => {
  const { icons, title } = props;
  const [justCopied, setJustCopied] = React.useState<string | null>(null);
  const copyIdRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopied = React.useCallback((name: string, importCode: string) => {
    Notifications.show({
      title: (
        <span>
          <code className={classes.copiedCode}>{importCode}</code> copied 🎉
        </span>
      ),
      color: 'green',
    });
    setJustCopied(name);
    copyIdRef.current = setTimeout(() => {
      setJustCopied(null);
    }, 2000);
  }, []);

  React.useEffect(
    () => () => {
      if (copyIdRef.current) {
        clearTimeout(copyIdRef.current);
      }
    },
    [],
  );

  const label = categories[title];

  return (
    <div>
      <h3>{label}</h3>
      <ul className={classes.anticonsList}>
        {icons.map((entry) => (
          <CopyableIcon
            key={entry.name}
            entry={entry}
            justCopied={justCopied === entry.name}
            onCopied={onCopied}
          />
        ))}
      </ul>
    </div>
  );
};

export default Category;
