import React, { useContext } from 'react';

import Context from './context';

const GrandSon = () => {
  const name = useContext(Context);
  return (
    <div>
      <span>
        這是grandson,收到的context值為:
        {name}
      </span>
    </div>
  );
};

export default GrandSon;
