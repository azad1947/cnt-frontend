import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {authentication, twoFactor} from '../Images';
import {styles} from '../../utils/globalStyleSheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function CodeVerification(props) {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image source={authentication} style={styles.img} />
        <Text style={styles.tagLine}>
          "just one step more. we are here to help you. stay home stay safe."
        </Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          keyboardType={'phone-pad'}
          style={[styles.card, {color: '#fff'}]}
          placeholder={'verification code'}
          placeholderTextColor={'#6961ff'}
          value={props.code}
          onChangeText={(num) => props.setCode(num)}
        />
        {!props.isValidCode ? (
          <Text style={styles.error}>{props.error}</Text>
        ) : (
          <Text style={styles.error}>{props.isValidCode}</Text>
        )}

        <TouchableOpacity
          style={[styles.card, styles.button]}
          onPress={props.handleSubmit}>
          <Text style={styles.submit}>SUBMIT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.covidView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,}}>
          <Text
            style={{
              fontSize: hp('2.5%') > wp('2.5%') ? hp('2.5%') : wp('2.5%'),
            }}>
            din't get verification code??
          </Text>
          <TouchableOpacity onPress={props.sendCodeAgain}>
            <Text style={styles.link}> Send Again</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.covid}>Covid-19: Stay Home, Stay Safe</Text>
      </View>
    </View>
  );
}

