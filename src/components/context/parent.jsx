import React from 'react';

import Son from './son';
import Context from './context';

const Parent = () => (
  <div>
    <Context.Provider value="從鉤子提供的值">
      <Son />
    </Context.Provider>
  </div>
);
export default Parent;
