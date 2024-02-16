import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView from 'react-native-maps'

export default function App() {
  return (
    <View style={styles.container}>



      <View>
        <TextInput
          placeholder="Type an address"
          style={styles.TextInput}
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
