import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TextInput, Alert, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

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
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch coordinates of the given address
  const fetchCoordinates = () => {
    setLoading(true);
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
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
          });

          setCoordinates({
            latitude: latitudeFloat,
            longitude: longitudeFloat
          });

          Keyboard.dismiss();
          setAddress("");
          setLoading(false);
        } else {
          Alert.alert("No results found for " + address);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }

  // Check permission to get location information
  // If permission is given, update map to current location
  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMapRegion({ ...mapRegion, latitude: location.coords.latitude, longitude: location.coords.longitude });
      setCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      setLoading(false);
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>

      <MapView
        region={mapRegion}
        style={styles.mapStyle}>
        <Marker
          coordinate={coordinates} />
      </MapView>

      <View style={styles.bottomContainer}>
        {loading ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <TextInput
              placeholder="Type an address"
              style={styles.TextInput}
              value={address}
              onChangeText={text => setAddress(text)} />

            <Button
              title="Show"
              onPress={fetchCoordinates} />
          </View>
        )}

      </View>
      <StatusBar style="auto" />

    </KeyboardAvoidingView>
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
    textAlign: 'center',
  },
  mapStyle: {
    width: "100%",
    height: "90%",
  },
  bottomContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '7%'
  },

});
