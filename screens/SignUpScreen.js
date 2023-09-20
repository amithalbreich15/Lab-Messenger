import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import apiReq from '../utils/axios';
import {AsyncStorage} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

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
// import Feather from 'react-native-vector-icons/Feather';
import { Feather, Lock, Mail, Phone, User } from "react-native-feather";
import { LinearGradient } from 'expo-linear-gradient';


const SignUpScreen = () => {
  const navigation = useNavigation();

  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [Email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmedPassword, setConfirmedPassword] = useState('')
  const [isError, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [mobilePhone, SetMobilePhone] = useState('')
  const [labName, SetLabName] = useState('')
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture


  const emailValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(Email)
  }

  const mobilePhoneValidation = () => {
    // Regular expression for mobile phone validation
    // Allows numbers with or without country code, and optional hyphens or spaces
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(mobilePhone);
  };
  
  const pickImage = () => {
    // Function to open image picker
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Set the selected image
        setProfilePicture(response.uri);
      }
    });
  };

  const signupHandle = async () => {
    if (!firstName || !lastName || !Email || !password || !ConfirmedPassword || !mobilePhone || !labName) {
      setErrorMsg("Please fill all the fields, try again.")
      setError(true)
      return
    }
    if (password != ConfirmedPassword) {
      setErrorMsg("Passwords do not match, try again.")
      setError(true)
      return
    }
    if (!emailValidation()) {
      setErrorMsg("The given E-mail is not valid! try again.")
      setError(true)
      return
    }
    if (!mobilePhoneValidation()) {
      setErrorMsg("The given Mobile Phone is not valid! try again.")
      setError(true)
      return
    }
  
    // try {
      // const response = await apiReq.post('/auth/register', {
      //   "first_name": firstName,
      //   "last_name": lastName,
      //   "email": Email,
      //   "password": password,
      //   "mobile_phone": mobilePhone,
      //   "admin": "false"
      // });
  
      // await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('SignInScreen', { profilePicture });
    // } catch (err) {
    //   setErrorMsg("User already exists, Please log in")
    //   setError(true)
    //   return
    // }
  }
  


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#014576' barStyle="light-content"/>
      <View style={styles.header}>
      <Text style={styles.titleHeader}>Lab Messenger</Text>
        <Text style={styles.registerHeader}>Researcher's Registration</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <ScrollView>
          {/* Profile Picture */}
          {/* Profile Picture */}
         {/* Profile Picture */}
          <TouchableOpacity onPress={pickImage} style={styles.profilePictureContainer}>
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
                <Text style={styles.profilePictureText}>Upload your Profile Picture</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.text_footer}>First Name</Text>
          <View style={styles.action}>
            <User
              name="user-circle"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your First Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => { setError(false); setfirstName(val) }}
            />
          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Last Name</Text>
          <View style={styles.action}>
            <User
              name="user-circle"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your Last Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => { setError(false); setlastName(val) }}
            />
          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Lab's Name</Text>
          <View style={styles.action}>
            <Feather
              name="mail"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your Lab's Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => { SetLabName(val); setError(false) }}
            />
          </View>



          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>E-Mail</Text>
          <View style={styles.action}>
            <Mail
              name="mail"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your E-Mail"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => { setEmail(val); setError(false) }}
            />
          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Mobile Phone</Text>
          <View style={styles.action}>
            <Phone
              name="mail"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your Mobile Phone"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => { SetMobilePhone(val); setError(false) }}
            />

          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Password</Text>
          <View style={styles.action}>
            <Lock
              name="lock"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setPassword(val)}
              secureTextEntry={true}
            />

          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Confirm Password</Text>
          <View style={styles.action}>
            <Lock
              name="lock"
              color="#014576"
              size={20}
            />
            <TextInput
              placeholder="Confirm Your Password"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => { setError(false), setConfirmedPassword(val) }}
              secureTextEntry={true}

            />

          </View>

          {isError ? (
            <Animatable.View animation='fadeInLeft' duration={500}>
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            </Animatable.View>
          ) : null}

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={signupHandle}>
              <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.signIn}>
                <Text style={[styles.textSign, { color: '#fff' }]}>Register Reasercher</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014576'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40
  },
  text_footer: {
    color: '#014576',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#014576',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 60, // Increase the height to make the button visible
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },  
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  color_textPrivate: {
    color: 'grey'
  },
  headerText: {
    fontWeight: 'bold', // Make the text bold
    fontSize: 20, // Adjust the font size as needed
    color: '#014576', // Your desired text color
    textAlign: 'center', // Center the text horizontally
    marginBottom: 10, // Add some spacing below the text
    fontFamily: 'YourCustomFont', // Replace with the name of your custom font
    fontVariant: ['small-caps'],
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
  registerHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FDFDFD', // White or cream color
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'YourCustomFont',
    fontVariant: ['small-caps'],
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20, // Adjust this to align with the grey circle
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center', // Center the image
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
