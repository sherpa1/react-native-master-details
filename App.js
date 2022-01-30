import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

const UserPreview = ({ item }, navigation) => {

  const on_press = () => {
    navigation.navigate('Details', { user: item })
  };

  return (
    <Pressable style={styles.UserPreview} onPress={() => on_press()}>
      <Text style={{ color: 'white', fontSize: 30 }}>{item.name}</Text>
    </Pressable>
  );

}

const MasterScreen = ({ navigation }) => {

  const [users, setUsers] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(0);

  const api = 'https://jsonplaceholder.typicode.com';

  useEffect(() => {

    async function getUsers() {

      try {

        setLoadingStatus(1);//show ActivityIndicator

        //get users from API
        const results = await axios.get(`${api}/users`);

        setUsers(results.data);

        console.log(users);

        setLoadingStatus(0);//hide ActivityIndicator

      } catch (error) {
        console.error(error);
      }

    }

    getUsers();

  }, []);

  return (
    <SafeAreaView>
      {loadingStatus === 1 ? <ActivityIndicator /> : null}
      {(users.length) ?
        <FlatList data={users} keyExtractor={(item) => item.id} renderItem={(item) => UserPreview(item, navigation)} />
        : <Text>No users found.</Text>}
    </SafeAreaView>);
};

const DetailsScreen = ({ navigation, route }) => {

  const on_press = () => {
    alert("Added to you favourites");
  };

  return (
    <View style={styles.Screen}>
      <Text style={styles.text.h1}>{route.params.user.name}</Text>
      <Text>{route.params.user.username}</Text>
      <Text>{route.params.user.email}</Text>
      <Text>{route.params.user.phone}</Text>
      <Text>{route.params.user.website}</Text>
      <Text style={styles.text.h2}>Address :</Text>
      <Text>{route.params.user.address.street}</Text>
      <Text>{route.params.user.address.suite}</Text>
      <Text>{route.params.user.address.city}</Text>
      <Text>{route.params.user.address.zipcode}</Text>
      <Text>{route.params.user.address.geo.lat}</Text>
      <Text>{route.params.user.address.geo.lng}</Text>
      <Text style={styles.text.h2}>Company :</Text>
      <Text>{route.params.user.company.name}</Text>
      <Text>{route.params.user.company.bs}</Text>
      <Button title="Add to favourites" color="red" onPress={() => on_press()} />
    </View>
  );
};

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen
          name="Master"
          component={MasterScreen}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    h1: { fontSize: 30 },
    h2: { fontSize: 20 },
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  Screen: {
    padding: 30,
    justifyContent: 'space-evenly',
    flex: 1,
  },
  UserPreview: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "grey",
    margin: 10,
  },

});

export default App;
