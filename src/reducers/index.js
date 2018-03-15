const actionMap = {
  CHANGE_CAT: (state, {catUrl, imageId}) => ({ ...state, catUrl, imageId }),
  GIF_LOADING: (state, { isGifLoading }) => ({ ...state, isGifLoading }),
};

export default function app(state = { isGifLoading: true }, action) {
  const reducer = actionMap[action.type];
  if (!reducer) return state;

  return reducer(state, action);
}