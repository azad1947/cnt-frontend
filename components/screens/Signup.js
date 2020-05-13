import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {dev} from '../Images';
import {Actions} from 'react-native-router-flux';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const back = () => {
    Actions.push('login');
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={dev} style={styles.img} />
      <View style={{flex: 1}}>
        <TextInput
          style={styles.card}
          placeholder={'name'}
          onChangeText={(nam) => setName(nam)}
          keyboardtype={'phone-pad'}
          value={name}
        />
        <TextInput
          style={styles.card}
          placeholder={'phone'}
          onChangeText={(phn) => setPhone(phn)}
          keyboardtype={'phone-pad'}
          value={phone}
        />
        <TextInput
          style={styles.card}
          placeholder={'password'}
          onChangeText={(pwd) => setPassword(pwd)}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.card}>
          <Text style={{textAlign: 'center', fontSize: 15}}>Submit</Text>
        </TouchableOpacity>
        <Text style={{height: 35, textAlign: 'center'}}>
          already have an account? <Text style={styles.link} onPress={() => back()}> Sign In </Text>
        </Text>
      </View>
      <Text style={styles.covid}>Covid-19: Stay Home, Stay Safe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  img: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  card: {
    width: 250,
    height: 36,
    borderRadius: 100 / 2,
    backgroundColor: 'skyblue',
    margin: 10,
    padding: 10,
  },
  link: {
    fontSize: 15,
    color: 'blue',
  },
  covid: {
    width: '100%',
    height: 30,
    textAlign: 'center',
    backgroundColor: 'pink',
  },
});
