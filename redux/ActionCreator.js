export default function ActionCreator(action, auth) {
  return {
    type: action,
    phone: auth.phone,
    name: auth.name,
    token: auth.token,
  };
}
