import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation and useRoute
import * as Animatable from 'react-native-animatable';

const EndScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const route = useRoute(); // Initialize route
  const firstName = route?.params?.firstName || 'John Doe';
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  const handleRegisterNewResearcher = () => {
    navigation.navigate('SignUpScreen'); // Navigate to SignUpScreen
  };

  const handleLoginToSendMoreMessages = () => {
    navigation.navigate('SignInScreen'); // Navigate to SignInScreen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
        <Text style={styles.titleHeader}>Lab Messenger</Text>
        <View style={styles.profilePictureContainer}>
          {profilePicture ? (
            <Animatable.Image
              animation='fadeIn'
              duration={1000}
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
          ) : (
            <View style={styles.profilePicturePlaceholder}>
              <Animatable.Image
                animation='fadeIn'
                duration={1000}
                source={require('../assets/images/user.png')}
                style={styles.profilePicture}
              />
            </View>
          )}
          <Text style={styles.userTextHeader}>Thank You {firstName}!</Text>
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.confirmationText}>The operation was successfully registered.</Text>
        <Text style={styles.confirmationText}>Messages will be sent to relevant users.</Text>
        <Image source={require('../assets/images/V_mark.png')} style={styles.greenCheckmark} />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleRegisterNewResearcher}
        >
          <LinearGradient
            colors={['#69a7d0', '#092f80']}
            style={styles.linearGradientButton}
          >
            <Text style={styles.buttonText}>Register New Researcher</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleLoginToSendMoreMessages}
        >
          <LinearGradient
            colors={['#7fffd4', '#092f80']}
            style={styles.linearGradientButton}
          >
            <Text style={styles.buttonText}>Login to Send More Messages</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    // paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    flexGrow: 1,
    alignItems: 'center',
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FDFDFD',
    textAlign: 'center',
    paddingTop: 20,
    marginBottom: 10,
    fontVariant: ['small-caps'],
  },
  userTextHeader: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    fontVariant: ['small-caps'],
  },
  greenCheckmark: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  confirmationText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FFFFFF'
  },
  button: {
    width: '80%',
    marginBottom: 20,
    borderRadius: 5,
    // paddingVertical: 10,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#69a7d0', // Use the same gradient color as ResearcherPage5
  },
  loginButton: {
    backgroundColor: '#7fffd4', // Use the same gradient color as ResearcherPage5
  },
  linearGradientButton: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  profilePictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    color: '#666',
  },
});

export default EndScreen;

