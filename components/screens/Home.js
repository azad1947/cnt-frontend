import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {home} from '../Images';

export default function Home() {
  const [normal, setNormal] = useState(0);
  const [ginger, setGinger] = useState(0);
  const [cig_brand, set_cig_brand] = useState('select');
  const [cigarette, setCigarette] = useState(0);
  return (
    <View style={styles.container}>
      <View>
        <Image source={home} style={styles.img} />
      </View>

      <Text style={{fontSize: 20}}>Normal Tea</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => setNormal(normal + 1)}>
          <Text style={styles.txt}>+</Text>
        </TouchableOpacity>
        <View style={styles.ring}>
          <Text>{normal}</Text>
        </View>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => (normal ? setNormal(normal - 1) : setNormal(normal))}>
          <Text style={styles.txt}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />

      <Text style={{fontSize: 20}}>Ginger Tea</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => setGinger(ginger + 1)}>
          <Text style={styles.txt}>+</Text>
        </TouchableOpacity>
        <View style={styles.ring}>
          <Text>{ginger}</Text>
        </View>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => (ginger ? setGinger(ginger - 1) : setGinger(ginger))}>
          <Text style={styles.txt}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />

      <Text style={{fontSize: 20}}>Cigarette</Text>
      <Picker
        selectedValue={cig_brand}
        style={{height: 50, width: 200}}
        onValueChange={(itemValue, itemIndex) => set_cig_brand(itemValue)}>
        <Picker.Item label={'select'} value={'select'} />
        <Picker.Item label="Classic Milds" value="Classic Milds" />
        <Picker.Item label="Goldflake Lights" value="Goldflake Lights" />
        <Picker.Item label={'Goldflake Small'} value={'Goldflake Small'} />
        <Picker.Item label={'Goldflake'} value={'Goldflake'} />
        <Picker.Item label={'Classic Regular'} value={'Classic Regular'} />
        <Picker.Item label={'Wills'} value={'Wills'} />
      </Picker>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => setCigarette(cigarette + 1)}>
          <Text style={styles.txt}>+</Text>
        </TouchableOpacity>
        <View style={styles.ring}>
          <Text>{cigarette}</Text>
        </View>
        <TouchableOpacity
          style={styles.circle}
          onPress={() =>
            cigarette ? setCigarette(cigarette - 1) : setCigarette(cigarette)
          }>
          <Text style={styles.txt}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />

      <TouchableOpacity style={styles.card}>
        <Text style={{textAlign: 'center', fontSize: 15, color: 'white'}}>
          Place Order
        </Text>
      </TouchableOpacity>
      <Text style={styles.covid}>Covid-19: Stay Home, Stay Safe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#6961ff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  txt: {
    color: 'white',
    fontSize: 30,
  },
  ring: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderColor: '#6961ff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  line: {
    width: '80%',
    borderBottomColor: '#888',
    borderBottomWidth: 1,
  },
  card: {
    width: 250,
    height: 40,
    borderRadius: 100 / 2,
    backgroundColor: '#6961ff',
    padding: 10,
    top: 20,
  },
  covid: {
    width: '100%',
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 7,
    backgroundColor: 'pink',
    bottom: -50,
  },
});
