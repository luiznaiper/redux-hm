import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  entities: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'task/add': {
      return {
        ...state,
        entities: state.entities.concat({ ...action.payload }),
      };
    }
    case 'task/complete': {
      const newTasks = state.entities.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return {
        ...state,
        entities: newTasks,
      };
    }
    default:
      return state;
  }
};

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <li
      style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      onClick={() => dispatch({ type: 'task/complete', payload: task })}
    >
      {task.title}
    </li>
  );
};

const App = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((x) => x);
  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }
    const id = Math.random().toString(36);
    const task = { title: value, completed: false, id };
    dispatch({ type: 'task/add', payload: task });
    setValue('');
  };
  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
      <button>Show All Tasks</button>
      <button>Completed</button>
      <button>Incompleted</button>
      <ul>
        {state.entities.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default App;
export { reducer };
