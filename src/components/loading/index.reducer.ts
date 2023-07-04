import produce from 'immer';
import * as types from './index.constraints';

interface LoadingInterFace {
  isLoading : boolean
}

const initialState: LoadingInterFace = {
  isLoading : false
}


export const LoadingReducer = (state = initialState, action : any) =>
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
