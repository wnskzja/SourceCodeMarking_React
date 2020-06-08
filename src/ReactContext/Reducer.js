export default (state, action) => {
  switch (action.type) {
    case "SET_LIST_NOTI":
      return {
        ...state,
        notifications: action.payload,
      };

    default:
      return state;
  }
};
