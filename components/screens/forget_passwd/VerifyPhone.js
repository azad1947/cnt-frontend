import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {forgetPassword} from '../../Images';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ActionCreator from '../../../redux/ActionCreator';
import {FORGET_PASSWD} from '../../../redux/actions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Store from '../../../redux/Store';
import {styles} from '../../../utils/globalStyleSheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
function VerifyPhone({dispatch}) {
  const [isPhoneCorrect, setIsPhoneCorrect] = useState(null);
  const screenHeight = Math.round(Dimensions.get('window').height);
  const screenWidth = Math.round(Dimensions.get('window').width);
  const validateSchema = Yup.object({
    phone: Yup.string()
      .required('required')
      .matches(/^[0-9]+$/, 'invalid phone number')
      .length(10),
  });
  useEffect((props) => {
    lor(props);
    return rol();
  }, []);
  return (
    <Formik
      initialValues={{phone: ''}}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        const {phone} = values;
        axios
          .post('http://192.168.0.112:3000/resendcode', values)
          .then((res) => {
            console.log('res.data---->', res.data);
            if (res.data === 'no account with this phone') {
              return setIsPhoneCorrect('no user with this phone');
            }
            dispatch(ActionCreator(FORGET_PASSWD, {phone: values.phone}));
            Actions.push('forget_password_verification');
          })
          .catch((err) => console.log('err---->', err));
      }}>
      {({handleChange, handleSubmit, errors, values, touched}) => {
        const view = [
          <View style={[styles.container]}>
            <View style={{alignItems: 'center'}}>
              <Image source={forgetPassword} style={styles.img} />
              <Text style={styles.tagLine}>
                hey, it happens. Don't worry, we are here to help you.
              </Text>
            </View>
            <View style={style.inputView}>
              <TextInput
                autoFocus={true}
                keyboardType={'phone-pad'}
                style={styles.card}
                placeholder={'phone'}
                onChangeText={handleChange('phone')}
                values={values.phone}
              />
              {!isPhoneCorrect ? (
                <Text style={styles.error}>
                  {touched.phone && errors.phone}
                </Text>
              ) : (
                <Text style={styles.error}>{isPhoneCorrect}</Text>
              )}
              <TouchableOpacity
                style={[styles.card, styles.button]}
                onPress={handleSubmit}>
                <Text style={style.submit}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={style.covidView}>
              <Text style={styles.covid}>Covid-19: Stay Home, Stay Safe</Text>
            </View>
          </View>,
        ];

        return view.map((x) =>
          screenHeight > screenWidth ? (
            x
          ) : (
            <ScrollView key={'a'}>{x}</ScrollView>
          ),
        );
      }}
    </Formik>
  );
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: '70%',
    height: '60%',
    resizeMode: 'contain',
  },
  tagLine: {
    width: '80%',
    textAlign: 'center',
    padding: 10,
    fontSize: 15,
    color: '#6961ff',
    marginBottom: 10,
    // fontFamily: 'sans-serif-light',
    fontFamily: 'Merriweather-BlackItalic',
    fontWeight: 'bold',
    fontStyle: 'italic',
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
  card: {
    width: 250,
    height: 36,
    borderRadius: 100 / 2,
    backgroundColor: 'skyblue',
    padding: 10,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'brown',
  },
  imgView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    flex: 1,
    // alignItems: 'center',
    marginTop: 40,
  },
  submit: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: '#6961ff',
    paddingLeft: 10,
  },
});
*/

const style = StyleSheet.create({
  inputView: {
    marginTop: wp('2%') > hp('2%') ? wp('2%') : hp('2%'),
    marginBottom: wp('2%') > hp('2%') ? wp('2%') : hp('2%'),
  },
  submit: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  covidView: {
    width: '100%',
  },
});

export default connect(null)(VerifyPhone);
