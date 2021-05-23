
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Wrapper from "./src/Navigation";


const App =() => {
  

  return (
    <SafeAreaView style={{flex: 1}}>
     <Wrapper/>
      
    </SafeAreaView>
  );
};

export default App;
