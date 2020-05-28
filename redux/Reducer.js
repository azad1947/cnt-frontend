const _ = require('lodash');
export default function Reducer(state = {}, action) {
  switch (action.type) {
    case 'SIGN_UP':
      return {
        state,
        sign_up: {
          name: _.get(action, 'name', ''),
          phone: _.get(action, 'phone', ''),
          type: _.get(action, 'type', ''),
        },
      };
    case 'LOGIN':
      return {
        state,
        login: {
          name: _.get(action, 'name', ''),
          phone: _.get(action, 'phone', ''),
          type: _.get(action, 'type', ''),
          token: _.get(action, 'token', ''),
        },
      };
    case 'PLACE_ORDER':
      return {
        state,
        place_order: {
          name: _.get(action, 'name', ''),
          phone: _.get(action, 'phone', ''),
          type: _.get(action, 'type', ''),
        },
      };
    case 'FORGET_PASSWD':
      return {
        forget_passwd: {
          name: _.get(action, 'name', ''),
          phone: _.get(action, 'phone', ''),
          type: _.get(action, 'type', ''),
        },
      };
    default:
      return state;
  }
}
