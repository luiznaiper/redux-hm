import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  entities: [],
  filter: 'all',
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
    case 'filter/set': {
      return {
        ...state,
        filter: action.payload,
      };
    }
    default:
      return state;
  }
};

const selectTasks = (state) => {
  const { entities, filter } = state;

  if (filter === 'complete') {
    return entities.filter((task) => task.completed);
  }
  if (filter === 'incomplete') {
    return entities.filter((task) => !task.completed);
  }
  return entities;
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
  const tasks = useSelector(selectTasks);
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
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'all' })}>
        Show All Tasks
      </button>
      <button
        onClick={() => dispatch({ type: 'filter/set', payload: 'complete' })}
      >
        Completed
      </button>
      <button
        onClick={() => dispatch({ type: 'filter/set', payload: 'incomplete' })}
      >
        Incompleted
      </button>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default App;
export { reducer };
