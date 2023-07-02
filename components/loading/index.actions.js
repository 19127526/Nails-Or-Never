import * as types from './index.constraints';


export const turnOnLoading = ()  => ({
  type: types.TURN_ON_LOADING
});

export const turnOffLoading = () => ({
  type: types.TURN_OFF_LOADING
});
