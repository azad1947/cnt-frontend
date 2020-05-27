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
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import ActionCreator from '../../redux/ActionCreator';
import {SIGN_UP} from '../../redux/actions';
import axios from 'axios';

function Signup({dispatch}) {
  const [isPhoneExist, setIsPhoneExist] = useState(false);
  const validateSchema = Yup.object({
    name: Yup.string().required('required'),
    phone: Yup.string()
      .required('required')
      .matches(/^[0-9]+$/, 'invalid phone number')
      .length(10),
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
        dispatch(ActionCreator(SIGN_UP, values));
        axios
          .post('http://192.168.0.112:3000/signup', values)
          .then((res) => res.status)
          .then((code) => {
            console.log('code--->', code);
            let {name, phone} = values;
            dispatch(ActionCreator(SIGN_UP, {name, phone}));
            Actions.push('codeverification');
          })
          .catch((err) => {
            console.log('err---->', err);
            setIsPhoneExist(true);
          });
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
              keyboardType={'phone-pad'}
              onChangeText={handleChange('phone')}
              value={values.phone}
              placeholder={'phone'}
              style={styles.card}
              returnKeyType={'next'}
              ref={(input) => (this.phoneInput = input)}
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            {!isPhoneExist ? (
              <Text style={styles.error}>{touched.phone && errors.phone}</Text>
            ) : (
              <Text style={styles.error}>{'phone already exists'}</Text>
            )}
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
          </View>
          <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center',marginBottom:10}}>
              <Text style={{textAlign: 'center'}}>already have an account?</Text>
              <TouchableOpacity onPress={() => back()}>
                <Text style={styles.link}>Sign In</Text>
              </TouchableOpacity>
            </View>
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
  },
  link: {
    fontSize: 15,
    color: 'blue',
    marginLeft: 5,
  },
  covid: {
    width: '100%',
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'pink',
  },
  error: {
    color: '#6961ff',
    paddingLeft: 10,
  },
});

export default connect()(Signup);
