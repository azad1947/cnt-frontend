import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import CodeVerification from '../CodeVerification';
import {Actions} from 'react-native-router-flux';
import ActionCreator from '../../../redux/ActionCreator';
import {FORGET_PASSWD} from '../../../redux/actions';

function Verification_on_forget_password({user_data, dispatch}) {
  const [code, setCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = () => {
    if (code) {
      axios
        .post('http://192.168.0.112:3000/verify', {
          phone: user_data.phone,
          code: code,
        })
        .then(async (res) => {
          console.log('res---->', res.data);
          if (res.data.auth_token) {
            dispatch(
              ActionCreator(FORGET_PASSWD, {token: res.data.auth_token,phone:user_data.phone}),
            );
            Actions.push('updatePasswd');
          }
        })
        .catch((err) => {
          console.log('err---->', err);
          setIsValidCode('invalid code');
        });
    } else {
      setIsValidCode(null);
      setError('required');
    }
  };
  const sendCodeAgain = () => {
    axios
      .post('http://192.168.0.112:3000/resendcode', {
        phone: user_data.phone,
      })
      .then((res) => res.data)
      .then((data) => console.log('data---->', data))
      .catch((err) => console.log('err--->', err));
    setCode('');
    setIsValidCode(null);
    setError(null);
  };
  return (
    <CodeVerification
      handleSubmit={handleSubmit}
      sendCodeAgain={sendCodeAgain}
      code={code}
      error={error}
      isValidCode={isValidCode}
      setCode={setCode}
    />
  );
}

const mapStateToProps = (state) => {
  return {user_data: state.forget_passwd};
};

export default connect(mapStateToProps)(Verification_on_forget_password);
