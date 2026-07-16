import { UIColorsTuple } from '../../theme.types';

export function colorsTuple(input: string | string[]): UIColorsTuple {
  if (Array.isArray(input)) {
    return input as unknown as UIColorsTuple;
  }

  return Array(10).fill(input) as unknown as UIColorsTuple;
}
