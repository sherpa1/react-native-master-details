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
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword, signOut, useCreateUserWithEmailAndPassword } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from './config';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};


// // Initialize Firebase
const app = initializeApp(firebaseConfig);

// //const analytics = getAnalytics(app);

const auth = getAuth(app);


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

const logout = () => {
  signOut(auth);
}

const SignInScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);


  const on_sign_in = async () => {
    try {

      signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
    }
  }

  if (user) {
    return (
      <SafeAreaView>
        <Text>Current User: {user.email}</Text>
        <Button title="Sign out" onPress={() => logout()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar />

      {(loading) ? <ActivityIndicator /> : null}
      {(error) ? <Text>An error occurred : {error}</Text> : null}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <TextInput style={styles.TextInput} placeholder="login" value={email} onChangeText={setEmail} />
          <TextInput style={styles.TextInput} placeholder="password" value={password} secureTextEntry={true} onChangeText={setPassword} />
          <Button title="Sign in" onPress={() => on_sign_in()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SignUpScreen = ({ navigation }) => {

  // const [login, setLogin] = useState('');
  // const [password, setPassword] = useState('');

  // const [
  //   createUserWithEmailAndPassword,
  //   user,
  //   loading,
  //   error,
  // ] = useCreateUserWithEmailAndPassword(auth);

  // const on_sign_up = async () => {
  //   if (!login || login === '') {
  //     alert('Please fill your login');
  //   }
  //   if (!password || password === '') {
  //     alert('Please fill your password');
  //   }

  //   try {
  //     createUserWithEmailAndPassword(email, password)
  //   } catch (error) {

  //   }
  // }

  // if (error) {
  //   return (
  //     <View>
  //       <Text>Error: {error.message}</Text>
  //     </View>
  //   );
  // }
  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }
  // if (user) {
  //   return (
  //     <View>
  //       <Text>Registered User: {user.email}</Text>
  //     </View>
  //   );
  // }

  // return (
  //   <SafeAreaView>
  //     <TextInput placeholder='Login' />
  //     <TextInput placeholder='Password' />
  //     <Button title="Sign up" color="green" onPress={() => on_sign_up()} />
  //   </SafeAreaView>
  // );
}

const CurrentUser = () => {
  // const [user, loading, error] = useAuthState(auth);

  // if (loading) {
  //   return (
  //     <View>
  //       <Text>Initialising User...</Text>
  //     </View>
  //   );
  // }
  // if (error) {
  //   return (
  //     <View>
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );
  // }
  // if (user) {
  //   return (
  //     <View>
  //       <Text>Current User: {user.email}</Text>
  //       <Button title="Sign Out" onPress={logout} />
  //     </View>
  //   );
  // }
  // return <Button title="Sign In" onPress={login} />;
};

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen
          name="Sign In"
          component={SignInScreen}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUpScreen}
        />
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
  TextInput: {
    backgroundColor: 'white',
    marginBottom: 60,
    padding: 10,
    height: 40
  }
});

export default App;
