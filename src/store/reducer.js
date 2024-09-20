const initialState = {
  searchValue: '',
};

const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};

export default inputReducer;
