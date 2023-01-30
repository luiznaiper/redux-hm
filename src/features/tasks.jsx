import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';

const setPending = () => ({ type: 'tasks/pending' });

const setFulfilled = (payload) => ({ type: 'tasks/fulfilled', payload });

const setError = (error) => ({ type: 'tasks/error', error: error.message });

const setComplete = (payload) => ({ type: 'task/complete', payload });

const setFilter = (payload) => ({ type: 'filter/set', payload });

const fetchThunk = () => async (dispatch) => {
  dispatch(setPending());
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    const tasks = data.slice(0, 10);
    dispatch(setFulfilled(tasks));
  } catch (error) {
    dispatch(setError());
  }
};

const filterReducer = (state = 'all', action) => {
  switch (action.type) {
    case 'filter/set':
      return action.payload;
    default:
      return state;
  }
};

const initialFetching = { loading: 'idle', error: null };
const fetchingReducer = (state = initialFetching, action) => {
  switch (action.type) {
    case 'tasks/pending': {
      return { ...state, loading: 'pending' };
    }
    case 'tasks/fulfilled': {
      return { ...state, loading: 'succeded' };
    }
    case 'tasks/error': {
      return { error: action.error, loading: 'rejected' };
    }
    default: {
      return state;
    }
  }
};

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case 'tasks/fulfilled': {
      return action.payload;
    }
    case 'task/add': {
      return state.concat({ ...action.payload });
    }
    case 'task/complete': {
      const newTasks = state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return newTasks;
    }
    default:
      return state;
  }
};

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
