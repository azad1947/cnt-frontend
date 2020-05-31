import React, {useRef} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {updatePasswd} from '../../Images';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import ActionCreator from '../../../redux/ActionCreator';
import {FORGET_PASSWD} from '../../../redux/actions';
import {styles} from '../../../utils/globalStyleSheet';
import {focusIt, localhost} from '../../../utils/cntUtis';

function UpdatePasswd({user_data, dispatch}) {
  const matchPassword = 'password not matched';
  const confirmPasswordRef = useRef(null);
  const validateSchema = Yup.object({
    password: Yup.string().required('required').min(6),
    confirmPassword: Yup.string().required('required'),
  });
  return (
    <Formik
      initialValues={{password: '', confirmPassword: ''}}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        if (values.password === values.confirmPassword) {
          console.log('matched');
          console.log('user_data--->', user_data);
          axios({
            url: `${localhost}/updatepassword`,
            data: {
              phone: user_data.phone,
              password: values.password,
            },
            method: 'post',
            headers: {
              auth_token: user_data.token,
            },
          })
            .then((res) => {
              dispatch(
                ActionCreator(FORGET_PASSWD, {
                  name: res.data.name,
                  phone: res.data.phone,
                  token: res.data.auth_token,
                }),
              );
              Actions.push('home');
            })
            .catch((err) => console.log('err----->', err));
        }
      }}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Image source={updatePasswd} style={styles.img} />
            <Text style={styles.tagLine}>
              You can update your password here. enjoy.
            </Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.card}
              placeholder={'new password'}
              placeholderTextColor={'#6961ff'}
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry={true}
              onSubmitEditing={() => focusIt(confirmPasswordRef)}
            />
            <Text style={styles.error}>
              {touched.password && errors.password}
            </Text>
            <TextInput
              style={styles.card}
              placeholder={'confirm password'}
              placeholderTextColor={'#6961ff'}
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              ref={confirmPasswordRef}
              secureTextEntry={true}
            />
            {values.password !== values.confirmPassword ? (
              <Text style={styles.error}>{matchPassword}</Text>
            ) : (
              <Text style={styles.error}>
                {touched.confirmPassword && errors.confirmPassword}
              </Text>
            )}
            <TouchableOpacity style={[styles.card, styles.button]} onPress={handleSubmit}>
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.covidView}>
            <Text style={styles.covid}>Covid-19: Stay Home, Stay Safe</Text>
          </View>
        </View>
      )}
    </Formik>
  );
}

const mapStateToProps = (state) => {
  return {user_data: state.forget_passwd};
};
export default connect(mapStateToProps)(UpdatePasswd);
