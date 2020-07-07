import { hot } from 'react-hot-loader/root';
import React from 'react';

import StateAndEffect from './components/state-effect/state-effect';
import Parent from './components/context/parent';
import './app.less';

const App = () => (
  <div className="wrap">
    <StateAndEffect />
    <Parent />
  </div>
);

export default hot(App);
