const mac =
  (type, ...argNames) =>
  (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };

const reduceReducers =
  (...reducers) =>
  (state, action) =>
    reducers.reduce((acc, el) => el(acc, action), state);

const initialFetching = { loading: 'idle', error: null };
const makeFetchingReducer =
  (actions) =>
  (state = initialFetching, action) => {
    switch (action.type) {
      case actions[0]: {
        return { ...state, loading: 'pending' };
      }
      case actions[1]: {
        return { ...state, loading: 'succeded' };
      }
      case actions[2]: {
        return { error: action.error, loading: 'rejected' };
      }
      default: {
        return state;
      }
    }
  };

const makeSetReducer =
  (actions) =>
  (state = 'all', action) => {
    switch (action.type) {
      case actions[0]:
        return action.payload;
      default:
        return state;
    }
  };

const makeCrudReducer =
  (actions) =>
  (state = [], action) => {
    switch (action.type) {
      case actions[0]: {
        return action.payload;
      }
      case actions[1]: {
        return state.concat({ ...action.payload });
      }
      case actions[2]: {
        const newEntities = state.map((entity) => {
          if (entity.id === action.payload.id) {
            return { ...entity, completed: !entity.completed };
          }
          return entity;
        });
        return newEntities;
      }
      default:
        return state;
    }
  };

export { mac, makeFetchingReducer, makeSetReducer, reduceReducers, makeCrudReducer };
