import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilter,
  fetchThunk,
  TaskItem,
  selectStatus,
  selectTasks,
} from './features/tasks';

const App = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const status = useSelector(selectStatus);
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
  if (status.loading === 'pending') {
    return <p>Loading...</p>;
  }
  if (status.loading === 'rejected') {
    return <p>{status.error}</p>;
  }
  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
      <button onClick={() => dispatch(setFilter('all'))}>Show All Tasks</button>
      <button onClick={() => dispatch(setFilter('complete'))}>Completed</button>
      <button onClick={() => dispatch(setFilter('incomplete'))}>
        Incompleted
      </button>
      <button onClick={() => dispatch(fetchThunk())}>Fetch</button>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default App;
