import produce from 'immer';

export default (initialState) => (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case 'SET_USER':
        draft.user = payload.user;
        break;
      default:
        break;
    }
  });
