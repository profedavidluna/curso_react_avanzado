export const initialState = {
  status: 'idle',
  error: null,
  filters: {
    priority: 'all',
  },
  tickets: [],
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'tickets/loading':
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case 'tickets/success':
      return {
        ...state,
        status: 'success',
        tickets: action.payload,
      };
    case 'tickets/error':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case 'filters/priorityChanged':
      return {
        ...state,
        filters: {
          ...state.filters,
          priority: action.payload,
        },
      };
    default:
      return state;
  }
}
