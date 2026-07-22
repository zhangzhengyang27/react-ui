import React, { useState } from 'react';
import { Pagination } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  return (
    <DemoWrap>
      <Pagination value={page} onChange={setPage} total={10} />
    </DemoWrap>
  );
};

export default App;
