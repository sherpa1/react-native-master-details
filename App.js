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
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword, signOut, useCreateUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const UserPreview = ({ item }, navigation) => {

  const on_press = () => {
    navigation.navigate('Details', { user: item })
  };

  return (
    <Pressable style={[styles.UserPreview, item.favourite ? styles.favorite : null]} onPress={() => on_press()}>

      <View style={styles.detailsHeader}>
        <Text style={{ color: 'white', fontSize: 30 }}>{item.name}</Text>
        <Text style={styles.favouriteIcon}>{item.favourite ? "⭐️" : null}</Text>
      </View>
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

        results.data.map(item => item.favourite = false);//add a "favorite" field (boolean) for each user

        setUsers(results.data);//update state

        setLoadingStatus(0);//hide ActivityIndicator

      } catch (error) {
        console.error(error);
      }

    }

    getUsers();

  }, []);

  return (
    <SafeAreaView>
      <CurrentUser />
      {loadingStatus === 1 ? <ActivityIndicator /> : null}
      {(users.length) ?
        <FlatList data={users} keyExtractor={(item) => item.id} renderItem={(item) => UserPreview(item, navigation)} />
        : <Text>No users found.</Text>}
    </SafeAreaView>);
};

const DetailsScreen = ({ route }) => {

  const [user, setUser] = useState(route.params.user);
  const [isFavourite, setIsFavourite] = useState(user.favourite);

  const [message, setMessage] = useState("");

  const toggle_favourite = () => {

    const value = isFavourite ? false : true;

    setIsFavourite(value);

    setMessage(value ? "Added" : "Removed");

    //will clear message and hide notification after 2.5s 
    setTimeout(() => {
      setMessage("");
    }, 2500);

  };


  return (
    <View style={styles.Screen}>

      {(message !== "") ? <View style={styles.messageView}><Text style={styles.message}> {message}</Text><Button style={styles.closeButton} color="black" title="x" onPress={() => setMessage("")} /></View> : null}

      <View style={styles.detailsHeader}>
        <Text style={styles.text.h1}>{user.name}</Text>
        <Text style={styles.favouriteIcon}>{isFavourite ? "⭐️" : null}</Text>
      </View>

      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>{user.phone}</Text>
      <Text>{user.website}</Text>
      <Text style={styles.text.h2}>Address :</Text>
      <Text>{user.address.street}</Text>
      <Text>{user.address.suite}</Text>
      <Text>{user.address.city}</Text>
      <Text>{user.address.zipcode}</Text>
      <Text>{user.address.geo.lat}</Text>
      <Text>{user.address.geo.lng}</Text>
      <Text style={styles.text.h2}>Company :</Text>
      <Text>{user.company.name}</Text>
      <Text>{user.company.bs}</Text>
      {(isFavourite) ?
        <Button title="Remove from your favourites contacts" color="red" onPress={() => toggle_favourite()} /> :
        <Button title="Add to your favourites contacts" color="blue" onPress={() => toggle_favourite()} />
      }
    </View>
  );
};

const sign_out = () => {
  signOut(auth);
}

const SignInScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const on_sign_in = async () => {
    try {

      signInWithEmailAndPassword(auth, email, password);//Sign In with Firebase Auth

      go_to_master();

    } catch (error) {
      console.error(error);
      alert("An error has occurred while calling API");
    }
  }

  const go_to_master = () => {
    try {
      navigation.navigate("Master");
    } catch (error) {
      console.error(error);
    }
  }

  if (user) {
    return (
      <SafeAreaView>
        <View style={styles.SignInScreen}>
          <Button title="Sign out" color="red" onPress={() => sign_out()} />
          <Button title="Contacts List" onPress={() => go_to_master()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar />
      {(loading) ? <ActivityIndicator /> : null}
      {(error) ? <Text>An error has occurred : {error}</Text> : null}
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

//TODO:
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
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (user) {
    return (
      <View>
        <Text>Registered User: {user.email}</Text>
      </View>
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
      <View>
        <Text>Initialising User...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  if (user) {
    return (
      <View>
        <Text>Current User: {user.email}</Text>
        <Button color="red" title="Sign Out" onPress={sign_out} />
      </View>
    );
  }
  return <Button title="Sign In" onPress={login} />;
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
  detailsHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  Screen: {
    padding: 30,
    justifyContent: 'space-evenly',
    flex: 1,
  },
  SignInScreen: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: "100%"
  },
  UserPreview: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "grey",
    margin: 10,
  },
  favorite: {
    backgroundColor: "gold",
  },
  favouriteIcon: {
    fontSize: 30
  },
  TextInput: {
    backgroundColor: 'white',
    marginBottom: 60,
    padding: 10,
    height: 40
  },
  messageView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderType: "solid",
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "green",
    backgroundColor: 'green',
    padding: 6,
  },
  message: {
    fontSize: 18,
    color: "white",
  }
});

export default App;
