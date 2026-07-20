import React from 'react';
import { FiX } from 'react-icons/fi';

import classes from './index.module.css';

export interface BannerProps {
  id: string;
  children: React.ReactNode;
}

const STORAGE_KEY = 'reactui-closed-banners';

const Banner: React.FC<BannerProps> = ({ id, children }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      const closedBanners: string[] = Array.isArray(parsed) ? parsed : [];
      setIsVisible(!closedBanners.includes(id));
    } catch {
      setIsVisible(true);
    }
  }, [id]);

  const handleClose = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      const closedBanners: string[] = Array.isArray(parsed) ? parsed : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...closedBanners, id]));
      setIsVisible(false);
    } catch {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={classes.banner}>
      <div className={classes.content}>{children}</div>
      <button
        type="button"
        className={classes.closeButton}
        onClick={handleClose}
        aria-label="关闭横幅"
      >
        <FiX />
      </button>
    </div>
  );
};

export default Banner;
