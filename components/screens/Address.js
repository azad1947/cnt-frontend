import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {delivery} from '../Images';

export default function Address() {
  return (
    <View style={styles.container}>
      <Image source={delivery} style={styles.img} />
      <Text>Address</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
});
