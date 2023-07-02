import * as types from './index.constraints';
import {actionWithoutPayload} from "@/model/redux_action";

export const turnOnLoading = () : actionWithoutPayload => ({
  type: types.TURN_ON_LOADING
});

export const turnOffLoading = (): actionWithoutPayload => ({
  type: types.TURN_OFF_LOADING
});
