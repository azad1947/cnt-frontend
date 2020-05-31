import React,{useEffect} from 'react';
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

function UpdatePasswd({user_data, dispatch}) {
  const matchPassword = 'password not matched';
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
          <View style={styles.imgView}>
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
              secureTextEntry={true}
            />
            {values.password !== values.confirmPassword ? (
              <Text style={styles.error}>{matchPassword}</Text>
            ) : (
              <Text style={styles.error}>
                {touched.confirmPassword && errors.confirmPassword}
              </Text>
            )}
            <TouchableOpacity style={styles.touch} onPress={handleSubmit}>
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.covid}>Covid-19: Stay Home, Stay Safe</Text>
        </View>
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
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  card: {
    width: 250,
    height: 36,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: '#6961ff',
    color: '#6961ff',
    padding: 10,
    fontWeight: 'bold',
    margin: 5,
  },
  imgView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  covid: {
    width: '100%',
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'pink',
    color: '#6961ff',
  },
  submit: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  inputView: {
    flex: 1,
    marginTop: 50,
  },
  tagLine: {
    width: '80%',
    textAlign: 'center',
    padding: 10,
    fontSize: 15,
    color: '#6961ff',
    marginBottom: 10,
    fontFamily: 'Merriweather-BlackItalic',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  touch: {
    backgroundColor: '#6961ff',
    width: 170,
    padding: 5,
    margin: 50,
    borderRadius: 100 / 2,
  },
  error: {
    color: 'magenta',
    paddingLeft: 16,
    textAlign: 'left',
  },
});

const mapStateToProps = (state) => {
  return {user_data: state.forget_passwd};
};
export default connect(mapStateToProps)(UpdatePasswd);
