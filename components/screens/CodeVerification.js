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

export default function CodeVerification(props) {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: 300}}>
        <Image
          source={authentication}
          style={styles.img}
          resizeMode={'contain'}
        />
      </View>

      <Text style={styles.tagLine}>
        "just one step more. we are here to help you. stay home stay safe."
      </Text>

      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <View>
          <TextInput
            autoFocus={true}
            keyboardType={'phone-pad'}
            style={[styles.card, {color: '#fff'}]}
            placeholder={'verification code'}
            value={props.code}
            onChangeText={(num) => props.setCode(num)}
          />
          {!props.isValidCode ? (
            <Text style={styles.error}>{props.error}</Text>
          ) : (
            <Text style={styles.error}>{props.isValidCode}</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.card, {backgroundColor: '#a19cf8'}]}
          onPress={props.handleSubmit}>
          <Text style={styles.button}>SUBMIT</Text>
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Text style={{textAlign: 'center', fontSize: 12}}>
            din't get verification code??
          </Text>
          <TouchableOpacity onPress={props.sendCodeAgain}>
            <Text style={styles.link}> Send Again</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{width: '100%', backgroundColor: 'pink'}}>
        <Text style={styles.covid}>Covid-19: Stay Home, Stay Safe</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  img: {
    width: '100%',
    height: 350,
  },
  covid: {
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: '#6961ff',
  },
  card: {
    width: 250,
    height: 36,
    borderRadius: 100 / 2,
    backgroundColor: '#a19cf8',
    padding: 10,
    fontWeight: 'bold',
    // margin: 10,
  },
  link: {
    fontSize: 15,
    color: 'blue',
    fontWeight: 'bold',
  },
  button: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
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
  error: {
    // color: '#6961ff',
    color: 'red',
    paddingLeft: 18,
  },
});
