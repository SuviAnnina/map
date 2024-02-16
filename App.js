import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView from 'react-native-maps'

export default function App() {

  const [address, setAddress] = useState("");

  const mapRegion = {
    latitude: 60.192059,
    longitude: 24.945831,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  }


  return (
    <View style={styles.container}>

      <MapView
        region={mapRegion}
        style={styles.mapStyle}
      />

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
  },
  mapStyle: {
    width: "100%",
    height: "85%",
  },

});
