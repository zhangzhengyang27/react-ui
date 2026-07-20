import * as React from 'react';
import { useLocation } from 'dumi';

import Link from '../../common/Link';
import * as utils from '../../utils';

import classes from './Logo.module.css';

export interface LogoProps {
  isZhCN: boolean;
  location: any;
}

const logoSrc = '/favicon.svg';

const Logo: React.FC<LogoProps> = ({ isZhCN }) => {
  const { search } = useLocation();
  return (
    <h1>
      <Link to={utils.getLocalizedPathname('/', isZhCN, search)} className={classes.logo}>
        <img src={logoSrc} draggable={false} alt="logo" />
        <span className={classes.title}>react-ui</span>
      </Link>
    </h1>
  );
};

export default Logo;
