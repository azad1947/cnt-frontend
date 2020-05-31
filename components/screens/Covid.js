import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {socialDistancing} from '../Images';

export default function Covid() {
  return (
    <View style={styles.container}>
      <Image source={socialDistancing} style={styles.img} />
      <View style={styles.textView}>
        <Text style={styles.text}>
          <Text style={styles.num}>1.</Text> Maintain at least 1 metre (3 feet) distance between yourself and
          others.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.num}>2.</Text> Avoid going to crowded places. Do all your stuffs online.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.num}>3.</Text> Maintain at least 1 metre (3 feet) distance between yourself and
          others.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.num}>4.</Text> Regularly and thoroughly clean your hands with an alcohol-based
          hand rub or wash them with soap and water.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.num}>5.</Text> Avoid touching eyes, nose and mouth. Why? Hands touch many surfaces
          and can pick up viruses. Once contaminated, hands can transfer the
          virus to your eyes, nose or mouth. From there, the virus can enter
          your body and infect you.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.num}>6.</Text> If you have a fever, cough and difficulty breathing, seek medical
          attention
        </Text>
        <Text style={styles.text}><Text style={styles.num}>7.</Text> Use alcohol-based hand sanitizers.</Text>
        <Text style={styles.text}>
          <Text style={styles.num}>8.</Text> Apply a coin-sized amount of sanitizer on your hands. There is no
          need to use a large amount of the product.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  img: {
    width: '100%',
    height: '35%',
    resizeMode: 'contain',
  },
  text: {
    color: '#6961ff',
  },
  textView: {
    justifyContent: 'space-between',
    // marginBottom: 20,
  },
  num: {
    color: 'magenta',
    fontWeight: 'bold',
  },
});
