import React, { useContext } from 'react';

import Context from './context';
import GrandSon from './grandson';

const Son = () => {
  const name = useContext(Context);
  return (
    <div>
      <span>
        這是son,收到的context值為:
        {name}
      </span>
      <GrandSon />
    </div>
  );
};

export default Son;
