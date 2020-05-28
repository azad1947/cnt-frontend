import React from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import Store from './redux/Store';
import Login from './components/screens/Login';
import Signup from './components/screens/sign_up/Signup';
import Home from './components/screens/Home';
import Address from './components/screens/Address';
import VerifyPhone from './components/screens/forget_passwd/VerifyPhone';
import Verification_on_sign_up from './components/screens/sign_up/Verification';
import Verification_on_forget_password from './components/screens/forget_passwd/Verification';
import UpdatePasswd from './components/screens/forget_passwd/UpdatePasswd';


const App: () => React$Node = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Stack key={'root'} hideNavBar={true}>
          <Scene key={'login'} component={Login} title={'login'}  />
          <Scene key={'forgetPassword'} component={VerifyPhone} />
          <Scene
            key={'forget_password_verification'}
            component={Verification_on_forget_password}
            title={'forget_password_verification'}
          />
          <Scene key={'updatePasswd'} component={UpdatePasswd}  />
          <Scene key={'signup'} component={Signup} title={'signup'} />
          <Scene
            key={'sign_up_verification'}
            component={Verification_on_sign_up}
            title={'sign_up_verification'}
          />
          <Scene key={'home'} component={Home} title={'home'} />
          <Scene key={'address'} component={Address} title={'address'} />
        </Stack>
      </Router>
    </Provider>
  );
};

export default App;
