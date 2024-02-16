import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView from 'react-native-maps'

export default function App() {

  const [address, setAddress] = useState("");

  console.log(address);


  return (
    <View style={styles.container}>



      <View>
        <TextInput
          placeholder="Type an address"
          style={styles.TextInput}
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <Button title="Show"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    fontSize: 18,
  }
});
