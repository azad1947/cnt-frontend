import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
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
import {focusIt} from '../../utils/cntUtis';
import {styles} from '../../utils/globalStyleSheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

function Login({dispatch}) {
  const [isPhoneCorrect, setIsPhoneCorrect] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState('');
  const passwordRef = useRef(null);
  const loginRef = useRef(null);

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
                onSubmitEditing={() => focusIt(passwordRef)}
              />
              {!isPhoneCorrect ? (
                <Text style={styles.error}>
                  {touched.phone && errors.phone}
                </Text>
              ) : (
                <Text style={styles.error}>{isPhoneCorrect}</Text>
              )}
              <TextInput
                ref={passwordRef}
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
                    fontSize: wp('3%') > hp('3%') ? wp('3%') : hp('3%'),
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.push('forgetPassword')}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'blue',
                    margin: wp('4%') > hp('4%') ? wp('4%') : hp('4%'),
                    fontSize: wp('3%') > hp('3%') ? wp('3%') : hp('3%'),
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
export default connect()(Login);
