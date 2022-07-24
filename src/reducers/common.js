import {
  SHOW_TOAST,
  HIDE_TOAST,
  SET_CURRENT_TAB
} from '../constants/actionTypes';
import CONSTANTS from '../constants/constants';
const defaultState = {
  currentTab: CONSTANTS.DEFAULT_TAB_NAME,
  callbackMessage: {
    message: '',
    mtype: 'info',
    serverMessage: ''
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB:
      const { currentTab } = action
      return { ...state, currentTab };
    case SHOW_TOAST:
      const callbackMessage = {
        message: action.message,
        mtype: action.mtype
      };
      return { ...state, callbackMessage };
    case HIDE_TOAST:
      return { ...state, callbackMessage: defaultState.callbackMessage };
    default:
      return state;
  }
};
