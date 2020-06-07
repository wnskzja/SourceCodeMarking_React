export default (state, action) => {
  switch (action.type) {
    case "SET_LIST_NOTI":
      return {
        ...state,
        notifications: action.payload,
      };
    case "SET_IS_READ_NOTI": {
      const updateNotis = state.notifications.map((noti) => {
        if (noti.id === action.payload) {
          noti.is_read = true;
          return noti;
        }
        return noti;
      });
      return {
        ...state,
        notifications: updateNotis,
      };
    }

    default:
      return state;
  }
};
