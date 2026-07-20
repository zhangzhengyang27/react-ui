import * as React from 'react';
import { removeCSS, updateCSS } from '@rc-component/util';

import useLocale from '../../../hooks/useLocale';

import classes from './AdditionalInfo.module.css';

const whereCls = 'ui-where-checker';

const locales = {
  cn: {
    whereNotSupport: `你的浏览器不支持现代 CSS Selector，请使用现代浏览器（如 Chrome、Firefox 等等）查看官网。`,
    whereDocTitle: '兼容性调整（请使用现代浏览器访问）',
    whereDocUrl: '/docs/react/getting-started',
  },
  en: {
    whereNotSupport:
      'Your browser not support modern CSS Selector. Please use modern browser to view (e.g. Chrome, Firefox, etc).',
    whereDocTitle: 'Getting Started (Please use modern browser to visit)',
    whereDocUrl: '/docs/react/getting-started',
  },
};

// Check for browser support `:where` or not
// Warning user if not support to modern browser
const InfoNewVersion: React.FC = () => {
  const [location] = useLocale(locales);
  const [supportWhere, setSupportWhere] = React.useState(true);

  React.useEffect(() => {
    const p = document.createElement('p');
    p.className = whereCls;
    p.style.position = 'fixed';
    p.style.pointerEvents = 'none';
    p.style.visibility = 'hidden';
    p.style.width = '0';
    document.body.appendChild(p);
    updateCSS(
      `
:where(.${whereCls}) {
  content: "__CHECK__";
}
    `,
      whereCls,
    );

    // Check style
    const { content } = getComputedStyle(p);
    setSupportWhere(String(content).includes('CHECK'));

    document.body.removeChild(p);
    removeCSS(whereCls);
  }, []);

  if (supportWhere) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.alertBox}>
        {location.whereNotSupport} <a href={location.whereDocUrl}>{location.whereDocTitle}</a>
      </div>
    </div>
  );
};

export default InfoNewVersion;
