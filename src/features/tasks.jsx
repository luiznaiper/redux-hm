import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import {
  asyncMac,
  mac,
  makeCrudReducer,
  makeFetchingReducer,
  makeSetReducer,
  mat,
  reduceReducers,
} from './utils';

const asyncTasks = mat('tasks');

const [setPending, setFulfilled, setError] = asyncMac(asyncTasks);

const setComplete = mac('task/complete', 'payload');

const setFilter = mac('filter/set', 'payload');

const fetchThunk = () => async (dispatch) => {
  dispatch(setPending());
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    const tasks = data.slice(0, 10);
    dispatch(setFulfilled(tasks));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

const filterReducer = makeSetReducer(['filter/set']);

const fetchingReducer = makeFetchingReducer(asyncTasks);

const fulfilledReducer = makeSetReducer(['tasks/fulfilled']);

const crudReducer = makeCrudReducer(['task/add', 'task/completed']);

const tasksReducer = reduceReducers(crudReducer, fulfilledReducer);

const reducer = combineReducers({
  tasks: combineReducers({
    entities: tasksReducer,
    status: fetchingReducer,
  }),
  filter: filterReducer,
});

const selectStatus = (state) => state.tasks.status;

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <li
      style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      onClick={() => dispatch(setComplete(task))}
    >
      {task.title}
    </li>
  );
};

const selectTasks = (state) => {
  const {
    tasks: { entities },
    filter,
  } = state;

  if (filter === 'complete') {
    return entities.filter((task) => task.completed);
  }
  if (filter === 'incomplete') {
    return entities.filter((task) => !task.completed);
  }
  return entities;
};

export {
  setPending,
  setFulfilled,
  setError,
  setComplete,
  setFilter,
  fetchThunk,
  filterReducer,
  fetchingReducer,
  reducer,
  selectStatus,
  TaskItem,
  selectTasks,
};
