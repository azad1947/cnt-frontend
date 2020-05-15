import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Home from './components/screens/Home';
import Address from './components/screens/Address';

const App: () => React$Node = () => {
  return (
      <Signup/>
  )
};

export default App;
