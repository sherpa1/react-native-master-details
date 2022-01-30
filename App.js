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

import { AsyncStorage } from '@react-native-async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword, signOut, useCreateUserWithEmailAndPassword } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB89prskhKYIjFVShQ9cYv24-xmH-iMQA",
  authDomain: "react-native-master-details.firebaseapp.com",
  projectId: "react-native-master-details",
  storageBucket: "react-native-master-details.appspot.com",
  messagingSenderId: "1032455351023",
  appId: "1:1032455351023:web:3e7e1024875b5c86ea891a",
  measurementId: "G-EQ9ZZ33XG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

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

  const [login, onChangeLogin] = useState('john@doe.com');
  const [password, onChangePassword] = useState('azerty');
  const [user, loading, error] = useAuthState(auth, {});

  const on_sign_in = async () => {
    // if (!login || login === '') {
    //   alert('Please fill your login');
    // }
    // if (!password || password === '') {
    //   alert('Please fill your password');
    // }

    try {

      signInWithEmailAndPassword(auth, login, password);

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
      <TextInput value={login} autoFocus={true} placeholder="Login" onChangeText={onChangeLogin} />
      <TextInput value={password} placeholder="Password" secureTextEntry={true} onChangeText={onChangePassword} />
      <Button title="Sign in" onPress={() => on_sign_in()} />

    </SafeAreaView>
  );
}

const SignUpScreen = ({ navigation }) => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const on_sign_up = async () => {
    if (!login || login === '') {
      alert('Please fill your login');
    }
    if (!password || password === '') {
      alert('Please fill your password');
    }

    try {
      createUserWithEmailAndPassword(email, password)
    } catch (error) {

    }
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Registered User: {user.email}</p>
      </div>
    );
  }

  return (
    <SafeAreaView>
      <TextInput placeholder='Login' />
      <TextInput placeholder='Password' />
      <Button title="Sign up" color="green" onPress={() => on_sign_up()} />
    </SafeAreaView>
  );
}

const CurrentUser = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return <button onClick={login}>Sign in</button>;
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
    marginBottom: 20
  }
});

export default App;
