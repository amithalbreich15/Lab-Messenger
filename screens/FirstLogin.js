import React, { useState, useContext, createContext, useEffect } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native'; // Import KeyboardAvoidingView and ScrollView
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions, // Import Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Feather, Lock, Mail, Phone } from "react-native-feather";
// import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import apiReq from '../utils/axios';

import { useTheme } from 'react-native-paper';

const AuthContext = createContext('');

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [iserror, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState('');

  const { colors } = useTheme();

  const { signIn } = useContext(AuthContext);

  const emailValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };

  const mobilePhoneValidation = () => {
    // Regular expression for mobile phone validation
    // Allows numbers with or without country code, and optional hyphens or spaces
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(mobilePhone);
  };

  const loginHandle = async () => {
    if (!email || !password || !mobilePhone) {
      setPassword('1234');
      setEmail('amit@gmail.com');
      setMobilePhone('0507318899');
      setErrMsg('Error, Please fill all the fields again.');
      setError(true);
      return;
    }
    if (!emailValidation()) {
      setEmail('');
      setErrMsg('The given E-mail is invalid, please try again.');
      setError(true);
      return;
    }
    if (!mobilePhoneValidation()) {
      setMobilePhone('');
      setErrMsg('The given Mobile Phone is invalid, please try again.');
      setError(true);
      return;
    }

    // try {
    //   const response = await apiReq.post('/auth/login', { "email": email, "password": password, "mobile": mobilePhone })
    //   if (response.data.token) {
    //     await AsyncStorage.setItem('token', response.data.token);
    //     navigation.navigate('ResearcherPage1')
    //   } else {
    //     setErrMsg("Something went wrong :( please try again.")
    //     setError(true)
    //   };

    // } catch (err) {
    //   console.log(err);
    //   setPassword('')
    //   setEmail('')
    //   setMobilePhone('')
    //   setErrMsg("E-mail, Mobile Phone or Password is incorrect, please try again.")
    //   setError(true)
    //   return;

    // }

    navigation.navigate('OTPScreen');
  };

  return (
    <KeyboardAvoidingView // Wrap your content with KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <StatusBar backgroundColor="#014576" barStyle="light-content" />
      <ScrollView // Wrap your content with ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.titleHeader}>Welcome to</Text>
          <Text style={styles.titleHeader}>Lab Messenger!</Text>
        </View>
        <View>
          <Text style={styles.titleHeader}>Login:</Text>
        </View>
        <Animatable.View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
              width: width * 0.9, // Adjust width to 90% of screen width
              borderBottomLeftRadius: 30, // Add rounded corners to the bottom
              borderBottomRightRadius: 30, // Add rounded corners to the bottom
            },
          ]}
          animation="fadeInUpBig"
        >
          <Text style={styles.text_footer}>E-Mail</Text>
          <View style={styles.action}>
            <Mail color="#05375a" />
            <TextInput
              placeholder="Your E-Mail"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              value={email}
              onChangeText={(e) => {
                setError(false);
                setEmail(e);
              }}
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            Mobile Phone
          </Text>
          <View style={styles.action}>
            <Phone name="phone" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Mobile Phone"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {
                setError(false);
                setMobilePhone(val);
              }}
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
          <View style={styles.action}>
            <Lock color="#05375a" size={20}/>
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={true}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={password}
              autoCapitalize="none"
              onChangeText={(p) => {
                setError(false);
                setPassword(p);
              }}
            />
          </View>

          {iserror ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            </Animatable.View>
          ) : null}
        </Animatable.View>
      </ScrollView>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.signIn} onPress={loginHandle}>
          <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.signIn}>
            <Text style={[styles.textSign, { color: '#fff' }]}>
              Send me a one-time Code
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014576',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    width: width * 0.9, // Adjust width to 90% of screen width
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30, // Add rounded corners to the bottom
    borderBottomRightRadius: 30, // Add rounded corners to the bottom
    paddingHorizontal: 20,
    paddingTop: 30, // Adjust padding top
    paddingBottom: 20, // Adjust padding bottom
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust margin top
    paddingBottom: 24,
  },
  signIn: {
    width: width * 0.8, // Set button width to 80% of screen width
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#FDFDFD',
    textAlign: 'center',
    marginBottom: 10,
    fontVariant: ['small-caps'],
  },
});

