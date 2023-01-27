import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import App from './App';

const store = createStore((state = 0, action) => {
  switch (action.type) {
    case 'incrementar': {
      return state + 1;
    }
    case 'decrementar': {
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
});

console.log(store.getState());
store.dispatch({ type: 'incrementar' });
console.log(store.getState());
store.dispatch({ type: 'decrementar' });
console.log(store.getState());
store.dispatch({ type: 'incrementar' });
console.log(store.getState());
store.dispatch({ type: 'set', payload: 15 });
console.log(store.getState());
store.dispatch({ type: 'sum', payload: 10 });
console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
