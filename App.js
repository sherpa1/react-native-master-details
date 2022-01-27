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

  useEffect(() => { }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default App;
