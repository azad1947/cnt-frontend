import React from 'react';
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
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const validateSchema = Yup.object({
    name: Yup.string().required('required'),
    phone: Yup.string()
      .required('required')
      .matches(/^[0-9]+$/, 'invalid phone number')
      .min(10)
      .max(12),
    password: Yup.string().required('required').min(6),
  });
  const back = () => {
    Actions.push('login');
  };
  return (
    <Formik
      initialValues={{name: '', phone: '', password: ''}}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        console.log('values----->', values);
      }}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <ImageBackground source={dev} style={styles.img} />
          <View style={{flex: 1}}>
            <TextInput
              autoFocus={true}
              placeholder={'name'}
              onChangeText={handleChange('name')}
              value={values.name}
              style={styles.card}
              returnKeyType={'next'}
              onSubmitEditing={() => this.phoneInput.focus()}
            />
            <Text style={styles.error}>{errors.name}</Text>
            <TextInput
              onChangeText={handleChange('phone')}
              value={values.phone}
              placeholder={'phone'}
              style={styles.card}
              returnKeyType={'next'}
              ref={(input) => (this.phoneInput = input)}
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            <Text style={styles.error}>{touched.phone && errors.phone}</Text>
            <TextInput
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder={'password'}
              secureTextEntry={true}
              style={styles.card}
              ref={(input) => (this.passwordInput = input)}
            />
            <Text style={styles.error}>
              {touched.password && errors.password}
            </Text>
            <TouchableOpacity style={styles.card} onPress={handleSubmit}>
              <Text style={{textAlign: 'center', fontSize: 15}}>Submit</Text>
            </TouchableOpacity>
            <Text style={{height: 35, textAlign: 'center'}}>
              already have an account?{' '}
              <Text style={styles.link} onPress={() => back()}>
                Sign In
              </Text>
            </Text>
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
  error: {
    color: '#6961ff',
    paddingLeft: 10,
  },
});
