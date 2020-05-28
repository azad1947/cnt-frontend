import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ActionCreator from '../../../redux/ActionCreator';
import {LOGIN} from '../../../redux/actions';
import CodeVerification from '../CodeVerification';

function Verification_on_sign_up({user_data, dispatch}) {
  const [code, setCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = () => {
    if (code) {
      axios
        .post('http://192.168.0.112:3000/verify', {
          phone: user_data.phone,
          name: user_data.name,
          code: code,
        })
        .then((res) => {
          console.log('statusCode--->', res.status);
          console.log('res--->', res.data);
          if (res.data.code === 20404) {
            setIsValidCode('invalid code');
          } else {
            let token = res.data.auth_token;
            dispatch(
              ActionCreator(LOGIN, {
                name: user_data.name,
                phone: user_data.phone,
                token: token,
              }),
            );
            Actions.push('home');
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
  return {user_data: state.sign_up};
};

export default connect(mapStateToProps)(Verification_on_sign_up);
