export function themeColor(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME_COLOR":
      return { ...state, themeColor: action.payload };
    default:
      return state;
  }
}
