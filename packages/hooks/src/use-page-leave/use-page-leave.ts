import { useEffect } from 'react';
import { useEffectEvent } from '../use-effect-event/use-effect-event';

export function usePageLeave(onPageLeave: () => void) {
  const onPageLeaveEvent = useEffectEvent(onPageLeave);

  useEffect(() => {
    document.documentElement.addEventListener('mouseleave', onPageLeaveEvent);
    return () => document.documentElement.removeEventListener('mouseleave', onPageLeaveEvent);
  }, [onPageLeaveEvent]);
}
