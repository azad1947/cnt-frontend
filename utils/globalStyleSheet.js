import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
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
    padding: wp('1%') > hp('1%') ? wp('1%') : hp('1%'),
    marginTop: wp('2%') > hp('2%') ? wp('2%') : hp('2%'),
    paddingLeft: wp('2%') > hp('2%') ? wp('2%') : hp('2%'),
  },
  link: {
    fontSize: wp('3%') > hp('3%') ? wp('3%') : hp('3%'),
    color: 'blue',
    marginLeft: 5,
  },
  covid: {
    height: wp('8%') > hp('8%') ? wp('8%') : hp('8%'),
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
