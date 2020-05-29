import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {dev} from '../Images';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {connect} from 'react-redux';
import ActionCreator from '../../redux/ActionCreator';
import {LOGIN} from '../../redux/actions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

function Login({dispatch}) {
  const [isPhoneCorrect, setIsPhoneCorrect] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState('');

  useEffect(() => {
    lor();
    return rol();
  }, []);
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
      .length(10),
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
        <ScrollView>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Image source={dev} style={styles.img} />
              <Text style={styles.tagLine}>
                "working from home?? order chai and sutta online..."
              </Text>
            </View>
            <View>
              <TextInput
                keyboardType={'phone-pad'}
                autoFocus={true}
                style={styles.card}
                placeholder={'phone'}
                onChangeText={handleChange('phone')}
                value={values.phone}
                returnKeyType={'next'}
                placeholderTextColor={'#6961ff'}
              />
              {!isPhoneCorrect ? (
                <Text style={styles.error}>
                  {touched.phone && errors.phone}
                </Text>
              ) : (
                <Text style={styles.error}>{isPhoneCorrect}</Text>
              )}
              <TextInput
                style={styles.card}
                placeholder={'password'}
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry={true}
                placeholderTextColor={'#6961ff'}
              />

              {!isPasswordCorrect ? (
                <Text style={styles.error}>
                  {touched.password && errors.password}
                </Text>
              ) : (
                <Text style={styles.error}>{isPasswordCorrect}</Text>
              )}
              <TouchableOpacity
                style={[styles.card, styles.button]}
                onPress={handleSubmit}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: wp('3.5%'),
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.push('forgetPassword')}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'blue',
                    margin: wp('4%'),
                    fontSize: wp('3.5%'),
                  }}>
                  forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%', marginTop: wp('4%')}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: hp('2.5%') > wp('2.5%') ? hp('2.5%') : wp('2.5%'),
                  }}>
                  Don't have an account yet?
                </Text>
                <TouchableOpacity onPress={() => goToSignup()}>
                  <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.covid}>Covid-19: Stay Home, Stay Safe</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: wp('100%'),
    height: hp('50%'),
    resizeMode: 'contain',
  },
  card: {
    width: wp('48%') > hp('48%') ? wp('48%') : hp('48%'),
    borderRadius: 50,
    fontWeight: 'bold',
    color: '#6961ff',
    borderColor: 'magenta',
    borderWidth: 1,
    padding: hp('1%'),
    marginTop: hp('2%'),
    paddingLeft: wp('2%'),
  },
  link: {
    fontSize: wp('3%') > hp('3%') ? wp('3%') : hp('3%'),
    color: 'blue',
    marginLeft: 5,
  },
  covid: {
    height: wp('8%'),
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'pink',
    color: '#6961ff',
    fontSize: wp('3%') > hp('3%') ? wp('3%') : hp('3%'),
  },
  error: {
    color: 'red',
    paddingLeft: hp('2.5%') > wp('2.5%') ? hp('2.5%') : wp('2.5%'),
  },
  tagLine: {
    width: wp('80%'),
    textAlign: 'center',
    fontSize: wp('2.5%') > hp('2.5%') ? wp('2.5%') : hp('2.5%'),
    color: '#6961ff',
    fontFamily: 'Merriweather-BlackItalic',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  button: {
    width: wp('30%') > hp('30%') ? wp('30%') : hp('30%'),
    backgroundColor: '#6961ff',
    color: 'white',
    borderColor: '#6961ff',
    padding: wp('2%') > hp('2%') ? wp('2%') : hp('2%'),
    alignSelf: 'center',
  },
});

export default connect()(Login);
