// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import * as Animatable from 'react-native-animatable';

// const OTPScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const firstName = route?.params?.firstName || 'John Doe';
//   const [otp, setOtp] = useState('');

//   const handleSubmit = () => {
//     // Add your code for OTP verification here
//     // You can check if the entered OTP is valid and navigate accordingly
//     // For example, if the OTP is valid, you can navigate to the next screen
//     navigation.navigate('ResearcherPage2');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.titleHeader}>Lab Messenger</Text>
//       </View>
//       <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
//         <View style={styles.profilePictureContainer}>
//           <Animatable.Image
//             animation='fadeIn'
//             duration={1000}
//             source={require('../assets/images/user.png')} // You can replace this with the actual image source
//             style={styles.profilePicture}
//           />
//         </View>
//         <Text style={styles.userTextHeader}>Hello, {firstName}!</Text>
//       </LinearGradient>
//       <View style={styles.content}>
//         <TextInput
//           placeholder="Enter 4-digit OTP"
//           style={styles.input}
//           onChangeText={(text) => setOtp(text)}
//           value={otp}
//           keyboardType="numeric"
//           maxLength={4}
//         />
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmit}
//         >
//           <LinearGradient
//             colors={['#7fffd4', '#092f80']}
//             style={styles.linearGradientButton}
//           >
//             <Text style={styles.buttonText}>Submit</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#014576',
//     minHeight: '100%',
//   },
//   header: {
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     paddingBottom: 20,
//   },
//   content: {
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingVertical: 30,
//     flexGrow: 1,
//     alignItems: 'center',
//   },
//   titleHeader: {
//     fontWeight: 'bold',
//     fontSize: 40,
//     color: '#FDFDFD',
//     textAlign: 'center',
//     marginBottom: 10,
//     fontVariant: ['small-caps'],
//   },
//   userTextHeader: {
//     fontWeight: 'bold',
//     fontSize: 30,
//     color: '#FFFFFF',
//     marginBottom: 10,
//     textAlign: 'center',
//     fontVariant: ['small-caps'],
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   submitButton: {
//     width: '80%',
//     marginBottom: 20,
//     borderRadius: 5,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   linearGradientButton: {
//     width: '100%',
//     borderRadius: 5,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   profilePictureContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profilePicture: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
// });

// export default OTPScreen;

import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useRef, useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const NUMBER_OF_INPUTS = 4; // 4-digit OTP

const OTPScreen = () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();
  const firstName = route?.params?.firstName || 'Researcher';

  // Removed type annotation from the useRef declaration
  const itemsRef = useRef([]);

  const [values, setValues] = useState(Array.from({ length: NUMBER_OF_INPUTS }, () => ''));

  const handleSubmit = () => {
    const otpCode = values.join('');

    if (otpCode === '1234') {
      navigation.navigate('ResearcherPage1');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Lab Messenger</Text>
      </View>
      <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
        <View style={styles.profilePictureContainer}>
          <Animatable.Image
            animation='fadeIn'
            duration={1000}
            source={require('../assets/images/user.png')}
            style={styles.profilePicture}
          />
        </View>
        <Text style={styles.userTextHeader}>Hello, {firstName}!</Text>
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.otpContainer}>
          {Array.from({ length: NUMBER_OF_INPUTS }, (_, index) => (
            <TextInput
              style={styles.input}
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              keyboardType={'numeric'}
              placeholder={'X'}
              value={values[index]}
              defaultValue=""
              maxLength={1}
              onChangeText={(text) => {
                if (text.length === 1 && index < NUMBER_OF_INPUTS - 1) {
                  const nextInput = itemsRef.current[index + 1];
                  if (nextInput) {
                    nextInput.focus();
                  }
                }

                const newValues = [...values];
                newValues[index] = text;
                setValues(newValues);
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <LinearGradient
            colors={['#7fffd4', '#092f80']}
            style={styles.linearGradientButton}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#014576',
    minHeight: '100%',
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  submitButton: {
    width: '80%',
    marginBottom: 20,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
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
});

export default OTPScreen;


