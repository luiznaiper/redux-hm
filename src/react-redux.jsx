import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const reducer = (state = 0, action) => {
  console.log({ action, state });
  switch (action.type) {
    case 'increase': {
      return state + 1;
    }
    case 'decrease': {
      return state - 1;
    }
    case 'set': {
      return action.payload;
    }
    case 'sum': {
      return state + action.payload;
    }
    default:
      return state;
  }
};

function App() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const set = () => {
    dispatch({ type: 'set', payload: value });
    setValue('');
  };
  const sum = () => {
    dispatch({ type: 'sum', payload: value });
  };
  return (
    <div>
      <p>Contador: {state}</p>
      <button onClick={() => dispatch({ type: 'increase' })}>Increase</button>
      <button onClick={() => dispatch({ type: 'decrease' })}>Decrease</button>
      <button onClick={set}>Set</button>
      <button onClick={sum}>Sum</button>

      <input value={value} onChange={(e) => setValue(Number(e.target.value))} />
    </div>
  );
}

export default App;
