const _ = require('lodash');
export default function ActionCreator(action, auth) {
  return {
    type: action,
    name: _.get(auth, 'name', ''),
    phone: _.get(auth, 'phone', ''),
    token: _.get(auth, 'token', ''),
  };
}
