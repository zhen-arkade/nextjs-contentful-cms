export function searchBarQuery(state, action) {
  switch (action.type) {
    case "INPUT_SEARCH_BAR_QUERY":
      return { ...state, searchBarQuery: action.payload };
    default:
      return state;
  }
}
