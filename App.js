import React, { useState, useEffect } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';


  const [users, setUsers] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(0);

  const UserPreview = ({ item }) => (
    <Text>{item.name}</Text>
  );

  useEffect(() => {

    async function getUsers() {

      try {

        setLoadingStatus(1);
        const results = await axios.get('https://jsonplaceholder.typicode.com/users');

        setUsers(results.data);
        setLoadingStatus(0);

      } catch (error) {
        console.error(error);
      }

    }

    getUsers();

  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={[styles.center, backgroundStyle]}>
      {loadingStatus === 1 ? <Text>Loading...</Text> : null}
      {(users.length && loadingStatus === 1 || loadingStatus === 0) ?
        <FlatList data={users} keyExtractor={(item) => item.id} renderItem={UserPreview} />
        : <Text>No users found.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});

export default App;
