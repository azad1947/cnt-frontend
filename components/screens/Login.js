import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {work} from '../Images';
import {dev} from '../Images';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {connect} from 'react-redux';
import ActionCreator from '../../redux/ActionCreator';
import {LOGIN} from '../../redux/actions';
import Store from '../../redux/Store';

function Login({dispatch}) {
  const [isPhoneCorrect, setIsPhoneCorrect] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState('');
  const goToSignup = () => {
    Actions.push('signup');
  };
  const goBack = () => {
    Actions.pop();
  };
  const validateSchema = Yup.object({
    phone: Yup.string()
      .required('required')
      .matches(/^[0-9]+$/, 'invalid phone number')
      .min(10)
      .max(12),
    password: Yup.string().required('required'),
  });
  return (
    <Formik
      initialValues={{phone: '', password: ''}}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        axios
          .post('http://192.168.0.112:3000/login', values)
          .then((res) => {
            if (res.data === 'no user with this phone') {
              setIsPhoneCorrect('no user with this phone');
              setIsPasswordCorrect('');
            } else if (res.data === 'wrong password') {
              setIsPasswordCorrect('wrong password');
              setIsPhoneCorrect('');
            } else {
              dispatch(
                ActionCreator(LOGIN, {
                  phone: values.phone,
                  token: res.data.auth_token,
                  name: res.data.name,
                }),
              );
              Actions.push('home');
            }
          })
          .catch((err) => console.log('err--->', err));
      }}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <ImageBackground source={dev} style={styles.img} />
          <Text style={styles.tagLine}>
            "working from home?? order chai and sutta online..."
          </Text>
          <View style={{flex: 1}}>
            <TextInput
              keyboardType={'phone-pad'}
              autoFocus={true}
              style={styles.card}
              placeholder={'phone'}
              onChangeText={handleChange('phone')}
              value={values.phone}
              returnKeyType={'next'}
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            {!isPhoneCorrect ? (
              <Text style={styles.error}>{touched.phone && errors.phone}</Text>
            ) : (
              <Text style={styles.error}>{isPhoneCorrect}</Text>
            )}
            <TextInput
              style={styles.card}
              placeholder={'password'}
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry={true}
              ref={(input) => (this.passwordInput = input)}
            />

            {!isPasswordCorrect ? (
              <Text style={styles.error}>
                {touched.password && errors.password}
              </Text>
            ) : (
              <Text style={styles.error}>{isPasswordCorrect}</Text>
            )}
            <TouchableOpacity style={styles.card} onPress={handleSubmit}>
              <Text
                style={{textAlign: 'center', fontSize: 13, fontWeight: 'bold'}}>
                login
              </Text>
            </TouchableOpacity>
            <Text style={{height: 35, textAlign: 'center'}}>
              Don't have an account?{' '}
              <Text style={styles.link} onPress={() => goToSignup()}>
                Sign UP
              </Text>
            </Text>
          </View>
          <View style={{width: '100%', backgroundColor: 'pink'}}>
            <Text style={styles.covid}>Covid-19: Stay Home, Stay Safe</Text>
          </View>
        </View>
      )}
    </Formik>
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
    padding: 10,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 15,
    color: 'blue',
  },
  covid: {
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6961ff',
  },
  error: {
    color: '#6961ff',
    paddingLeft: 10,
  },
  tagLine: {
    width: '80%',
    textAlign: 'center',
    padding: 10,
    fontSize: 15,
    color: '#6961ff',
    // marginTop: 5,
    marginBottom: 10,
    // fontFamily: 'sans-serif-light',
    fontFamily: 'Merriweather-BlackItalic',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default connect()(Login);
