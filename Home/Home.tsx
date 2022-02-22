import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export default function HomeScreen() {
  const { user } = useAuthentication();
  console.log(user);

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.displayName}!</Text>

      <Button title="Sign Out" style={styles.button} onPress={() => auth.signOut()}/>
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
  button: {
    marginTop: 10
  }
});
