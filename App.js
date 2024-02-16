import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

export default function App() {

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: 60.192059,
    longitude: 24.945831
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 60.192059,
    longitude: 24.945831,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });

  const apiKey = 'yourApiKey'

  const fetchCoordinates = () => {
    fetch(`https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`)
      .then(response => {
        if (!response)
          throw new Error("Error in fetch: " + response.statusText);
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const firstResult = data[0];
          const latitudeFloat = parseFloat(firstResult.lat);
          const longitudeFloat = parseFloat(firstResult.lon);

          setMapRegion({
            ...mapRegion,
            latitude: latitudeFloat,
            longitude: longitudeFloat
          })

          setCoordinates({
            latitude: latitudeFloat,
            longitude: longitudeFloat
          });
        } else {
          Alert.alert("No results found for address " + address);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }




  return (
    <View style={styles.container}>

      <MapView
        region={mapRegion}
        style={styles.mapStyle}
      >

        <Marker
          coordinate={coordinates}
        />
      </MapView>


      <View>
        <TextInput
          placeholder="Type an address"
          style={styles.TextInput}
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <Button title="Show"
          onPress={fetchCoordinates}
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
