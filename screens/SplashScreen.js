
import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const { height } = Dimensions.get("screen");
const height_logo = height * 0.5;

const SplashScreen = () => {
  const navigation = useNavigation();

  const handleSignUpScreenNavigation = () => {
    navigation.navigate('SignUpScreen');
  };

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#0e1654' barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
        animation="fadeInUpBig"
      >
        <Text style={[styles.title, {
          color: colors.text
        }]}>Welcome to</Text>
        <Text style={[styles.title, {
          color: colors.text
        }]}>Lab Messenger!</Text>
        <Text style={styles.text}>Create a new Researcher Account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={handleSignUpScreenNavigation}>
            <LinearGradient
              colors={['#7fffd4', '#092f80']}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started!</Text>
              {/* <MaterialIcons
                name="navigate-next"
                color="#fff"
                size={20}
              /> */}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1654'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: '#05375a',
    fontSize: 40,
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
  },
  text: {
    color: 'grey',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  signIn: {
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
