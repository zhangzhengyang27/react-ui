import { use } from 'react';
import { ModalsContext } from '../context';

export function useModals() {
  const ctx = use(ModalsContext);

  if (!ctx) {
    throw new Error(
      '[@xiaoye-react/modals] useModals hook was called outside of context, wrap your app with ModalsProvider component'
    );
  }

  return ctx;
}
