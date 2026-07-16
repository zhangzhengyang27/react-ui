import type { NotificationsFactory } from '@react-ui/notifications';
import type { StylesApiData } from '../types';

export const NotificationsStylesApi: StylesApiData<NotificationsFactory> = {
  selectors: {
    root: 'Notifications container, contains all notifications',
    notification: '单个通知',
  },

  vars: {
    root: {
      '--notifications-container-width': '控制 notifications container `max-width`',
      '--notifications-z-index': '控制 notifications container `z-index`',
    },
  },
};
