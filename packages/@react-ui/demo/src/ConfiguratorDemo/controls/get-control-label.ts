import { upperFirst } from '@react-ui/hooks';

export function getControlLabel(label: string) {
  return upperFirst(label.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase());
}
