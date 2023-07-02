import produce from 'immer';
import * as types from './index.constraints';



const initialState = {
  isLoading : false
}


export const LoadingReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.TURN_ON_LOADING:
        draft.isLoading = true
        break;
      case types.TURN_OFF_LOADING:
        draft.isLoading = false
        break;
      default:
        return state;
    }
  });
