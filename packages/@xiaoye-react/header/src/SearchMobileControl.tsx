import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { rem } from '@xiaoye-react/ui';
import { HeaderControl } from './HeaderControl';

interface SearchMobileControlProps {
  onSearch: () => void;
}

export function SearchMobileControl({ onSearch }: SearchMobileControlProps) {
  return (
    <HeaderControl onClick={() => onSearch()} tooltip="搜索">
      <MagnifyingGlassIcon style={{ width: rem(22), height: rem(22) }} />
    </HeaderControl>
  );
}
