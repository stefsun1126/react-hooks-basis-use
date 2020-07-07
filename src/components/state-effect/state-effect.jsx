import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addCount, subtractionCount } from '../../redux/actions';
import './state-effect.less';

const StateAndEffect = () => {
  // useState() 會返回一個數組
  // arr[0] : state 變量名
  // arr[1] : 改變這個 arr[0] 的方法
  // 參數為 arr[0] 的初始值
  const [count, setCount] = useState(0);

  // 可以設置多個 useState()
  const [people, setPeople] = useState({ name: '小明' });

  // 監聽 componentDidmount、componentDidUpdate、componentWillUnmount
  // 1.後面 array 參數不給的話，默認這三個生命週期時都觸發
  useEffect(() =>
    // eslint-disable-next-line
    console.log(count));

  //   // 2. 後面的array可以監聽哪個state改變時才觸發，這裡就是當 count 改變才觸發
  //   useEffect(
  //     () =>
  //       // eslint-disable-next-line
  //       console.log(count),
  //     [count],
  //   );

  //   // 3. componentWillUnmount 是使用 return 的方式
  //   // 要注意，這個寫法只會觸發 componentWillUnmount
  //   // eslint-disable-next-line
  //   useEffect(() => () => console.log('componentWillUnmount'), []);

  const addCountLocal = () => {
    setCount(count + 1);
  };

  const addAge = () => {
    // 跟 class 一樣，react的元素都是不可變的，都要返回一個新的址
    setPeople({ ...people, age: 18 });
  };

  // 用 useDispatch 產生 dispatch 方法
  const dispatch = useDispatch();

  return (
    <div className="stateEffect">
      <h2>{count}</h2>
      <button type="button" onClick={addCountLocal}>
        點擊加1
      </button>

      <h2>
        <span>
          姓名：
          {people.name}
        </span>
        <span>
          年紀：
          {people.age ? people.age : '從缺'}
        </span>
      </h2>
      <button type="button" onClick={addAge}>
        點擊就有年紀了唷
      </button>

      <h2>{useSelector((state) => state.count)}</h2>
      <button type="button" onClick={() => dispatch(addCount())}>
        點擊加1，這是運用redux的
      </button>
      <button type="button" onClick={() => dispatch(subtractionCount())}>
        點擊減1，這是運用redux的
      </button>
    </div>
  );
};

export default StateAndEffect;
