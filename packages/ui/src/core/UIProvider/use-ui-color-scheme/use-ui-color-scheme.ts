import { use, useCallback, useEffect, useRef } from 'react';
import { useColorScheme } from '@react-ui/hooks';
import { noop } from '../../utils';
import { UIContext, useUIStyleNonce } from '../UI.context';
import { UIColorScheme } from '../theme.types';

function disableTransition(nonce: string | undefined) {
  const style = document.createElement('style');
  style.setAttribute('data-ui-styles', 'inline');
  style.innerHTML = '*, *::before, *::after {transition: none !important;}';
  style.setAttribute('data-ui-disable-transition', 'true');
  nonce && style.setAttribute('nonce', nonce);

  document.head.appendChild(style);
  const clear = () =>
    document
      .querySelectorAll('[data-ui-disable-transition]')
      .forEach((element) => element.remove());
  return clear;
}

export function useUIColorScheme({ keepTransitions }: { keepTransitions?: boolean } = {}) {
  const clearStylesRef = useRef<() => void>(noop);
  const timeoutRef = useRef<number>(-1);
  const ctx = use(UIContext);
  const nonce = useUIStyleNonce();
  const nonceValue = useRef(nonce?.());

  if (!ctx) {
    throw new Error('[@react-ui/ui] UIProvider was not found in tree');
  }

  const { setColorScheme: setCtxColorScheme, clearColorScheme: clearCtxColorScheme } = ctx;

  const scheduleTransitionCleanup = useCallback(() => {
    clearStylesRef.current = keepTransitions ? () => {} : disableTransition(nonceValue.current);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      clearStylesRef.current?.();
    }, 10);
  }, [keepTransitions]);

  const setColorScheme = useCallback(
    (value: UIColorScheme) => {
      setCtxColorScheme(value);
      scheduleTransitionCleanup();
    },
    [setCtxColorScheme, scheduleTransitionCleanup]
  );

  const clearColorScheme = useCallback(() => {
    clearCtxColorScheme();
    scheduleTransitionCleanup();
  }, [clearCtxColorScheme, scheduleTransitionCleanup]);

  const osColorScheme = useColorScheme('light', { getInitialValueInEffect: false });
  const computedColorScheme = ctx.colorScheme === 'auto' ? osColorScheme : ctx.colorScheme;

  const toggleColorScheme = useCallback(
    () => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light'),
    [setColorScheme, computedColorScheme]
  );

  useEffect(
    () => () => {
      clearStylesRef.current?.();
      window.clearTimeout(timeoutRef.current);
    },
    []
  );

  return {
    colorScheme: ctx.colorScheme,
    setColorScheme,
    clearColorScheme,
    toggleColorScheme,
  };
}
