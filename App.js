import React from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import Store from './redux/Store';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Home from './components/screens/Home';
import Address from './components/screens/Address';
import CodeVerification from './components/screens/CodeVerification';

const App: () => React$Node = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Stack key={'root'} hideNavBar={true}>
          <Scene key={'login'} component={Login} title={'login'} initial />
          <Scene key={'signup'} component={Signup} title={'signup'} />
          <Scene
            key={'codeverification'}
            component={CodeVerification}
            title={'codeverification'}
            onBack={()=> Actions.push('home')}
          />
          <Scene key={'home'} component={Home} title={'home'} />
          <Scene key={'address'} component={Address} title={'address'} />
        </Stack>
      </Router>
    </Provider>
  );
};

export default App;
