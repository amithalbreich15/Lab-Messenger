import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {AsyncStorage} from 'react-native';

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

function WelcomeScreen({ navigation }) {
  const handleBeginRegistration = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')} // Replace with the path to your logo image
        style={styles.logo}
      />
      {/* <View style={styles.button}> */}
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => { { handleBeginRegistration() } }}
            >
              <LinearGradient
                colors={['#69a7d0', '#092f80']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, {
                  color: '#fff'
                }]}>Begin Registration</Text>
              </LinearGradient>
            </TouchableOpacity>

    </View>
  );
}

{/* <TouchableOpacity onPress={handleBeginRegistration}>
        <Text style={styles.beginRegistrationButton}>Begin Registration</Text>
      </TouchableOpacity> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust the dimensions as needed
    height: 200,
  },
  beginRegistrationButton: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue', // Change the color to your preference
  },
});

export default WelcomeScreen;
