// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, get, child } from 'firebase/database';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// const ResearcherPage4 = () => {
//   const [message, setMessage] = useState('');
//   const [researcherName, setResearcherName] = useState('');
//   const [isNextDisabled, setIsNextDisabled] = useState(true); // Added state for disabling the next button
//   const navigation = useNavigation();

//   useEffect(() => {
//     // Fetch the researcher's name from Firebase and set it in the state
//     fetchResearcherName().then((name) => {
//       setResearcherName(name);
//     });
//   }, []);

//   useEffect(() => {
//     // Enable or disable the next button based on message length
//     setIsNextDisabled(message.trim().length === 0 || message.length > 500);
//   }, [message]);

//   const handleNextClick = () => {
//     if (message.length > 500) {
//       Alert.alert('Message should not exceed 500 characters.');
//     } else {
//       // You can use router.push or navigation.navigate to go to the next page
//       // Example with navigation.navigate:
//       navigation.navigate('ResearcherPage5'); // Replace 'NextPage' with your actual page name
//     }
//   };

//   const handlePreviousClick = () => {
//     // Navigate to the previous screen or page
//     navigation.navigate('ResearcherPage3');
//   };

//   const fetchResearcherName = async () => {
//     try {
//       // Reference to the Firebase Realtime Database
//       const databaseRef = ref(database);

//       // Query the database to get the researcher's name
//       const snapshot = await get(child(databaseRef, 'researchers/researcher1/name'));

//       // Extract the researcher's name from the snapshot
//       const researcherName = snapshot.val();

//       return researcherName;
//     } catch (error) {
//       console.error('Error fetching researcher name:', error);
//       return null;
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
//         <Text style={styles.titleHeader}>Hello, {researcherName}!</Text>
//       </LinearGradient>
//       <View style={styles.content}>
//         <Text style={styles.headerText}>Write down the message you want to send to the recipient researcher:</Text>
//         <View style={styles.messageInputContainer}>
//           <TextInput
//             style={styles.messageInput}
//             multiline
//             placeholder="Type your message here:                               (Up to 500 charachters)"
//             placeholderTextColor="#014576"
//             textAlignVertical="top" // Start text from the top
//             value={message}
//             onChangeText={(text) => setMessage(text)}
//             maxLength={501} // Limit the message to 500 characters
//           />
//         </View>
//         {message.length > 0 && message.length <= 500 ? null : (
//           <Text style={styles.errorText}>
//             {message.length === 0
//               ? 'Please write a message to proceed.'
//               : 'Message should not exceed 500 characters.'}
//           </Text>
//         )}
//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity style={styles.prevButton} onPress={handlePreviousClick}>
//             <LinearGradient
//               colors={['#69a7d0', '#092f80']}
//               style={styles.labMessengerButtonGradient}
//             >
//               <Text style={styles.labMessengerButtonText}>Previous</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.nextButton,
//               isNextDisabled ? styles.disabledButton : {},
//             ]}
//             onPress={handleNextClick}
//             disabled={isNextDisabled} // Disable the button
//           >
//             <LinearGradient
//               colors={['#7fffd4', '#092f80']}
//               style={styles.labMessengerButtonGradient}
//             >
//               <Text style={styles.labMessengerButtonText}>Next</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ResearcherPage4;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#014576',
//     minHeight: windowHeight,
//   },
//   header: {
//     justifyContent: 'flex-end',
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   content: {
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingVertical: 30,
//     flexGrow: 1,
//     alignItems: 'center', // Center content vertically
//   },
//   labMessengerTextHeader: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   labMessengerText: {
//     color: '#014576',
//     fontSize: 18,
//     marginTop: 20,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   messageInputContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 10, // Adjust the border radius for a bigger frame
//     width: '100%',
//     marginBottom: 20, // Add some spacing between the input and buttons
//     borderWidth: 2, // Add a border
//     borderColor: '#69a7d0', // Border color
//   },
//   messageInput: {
//     padding: 10,
//     fontSize: 16,
//     minHeight: 200, // Adjust the height for more rows
//     textAlignVertical: 'top', // Start text from the top
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   prevButton: {
//     flex: 1,
//     marginRight: 10,
//   },
//   nextButton: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   labMessengerButtonGradient: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   labMessengerButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   headerText: {
//     fontWeight: 'bold', // Make the text bold
//     fontSize: 20, // Adjust the font size as needed
//     color: '#014576', // Your desired text color
//     textAlign: 'center', // Center the text horizontally
//     marginBottom: 10, // Add some spacing below the text
//     fontFamily: 'YourCustomFont', // Replace with the name of your custom font
//     fontVariant: ['small-caps'],
//   },
//   titleHeader: {
//     fontWeight: 'bold',
//     fontSize: 40,
//     color: '#FDFDFD', // White or cream color
//     textAlign: 'center',
//     marginBottom: 10,
//     fontFamily: 'YourCustomFont',
//     fontVariant: ['small-caps'],
//   },
// });

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import * as Animatable from 'react-native-animatable'; // Import Animatable

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const CustomCheckbox = ({ label, isChecked, onPress }) => (
  <TouchableOpacity style={styles.checkbox} onPress={onPress}>
    {isChecked && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

const ResearcherPage4 = () => {
  const [message, setMessage] = useState('');
  const [researcherName, setResearcherName] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const firstName = route?.params?.firstName || 'Researcher';
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  useEffect(() => {
    // Fetch the researcher's name from Firebase and set it in the state
    fetchResearcherName().then((name) => {
      setResearcherName(name);
    });
  }, []);

  useEffect(() => {
    // Enable or disable the next button based on message length
    setIsNextDisabled(message.trim().length === 0 || message.length > 500);
  }, [message]);

  const handleNextClick = () => {
    if (message.length > 500) {
      Alert.alert('Message should not exceed 500 characters.');
    } else {
      navigation.navigate('ResearcherPage5');
    }
  };

  const handlePreviousClick = () => {
    navigation.navigate('ResearcherPage3');
  };

  const fetchResearcherName = async () => {
    try {
      const databaseRef = ref(database);
      const snapshot = await get(child(databaseRef, 'researchers/researcher1/name'));
      const researcherName = snapshot.val();
      return researcherName;
    } catch (error) {
      console.error('Error fetching researcher name:', error);
      return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
        <View style={styles.labMessengerTextHeader}>
          <Text style={styles.titleHeader}>Lab Messenger</Text>
          <Text style={styles.userTextHeader}>Hello, {firstName}!</Text>
          <View style={styles.frame}>
            <View style={styles.profilePictureContainer}>
              {/* Profile Picture */}
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
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.headerText}>Write down the message you want to send to the recipient researcher:</Text>
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            multiline
            placeholder="Type your message here: (Up to 500 characters)"
            placeholderTextColor="#014576"
            textAlignVertical="top"
            value={message}
            onChangeText={(text) => setMessage(text)}
            maxLength={501}
          />
        </View>
        {message.length > 0 && message.length <= 500 ? null : (
          <Text style={styles.errorText}>
            {message.length === 0
              ? 'Please write a message to proceed.'
              : 'Message should not exceed 500 characters.'}
          </Text>
        )}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.prevButton} onPress={handlePreviousClick}>
            <LinearGradient
              colors={['#69a7d0', '#092f80']}
              style={styles.labMessengerButtonGradient}
            >
              <Text style={styles.labMessengerButtonText}>Previous</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              isNextDisabled ? styles.disabledButton : {},
            ]}
            onPress={handleNextClick}
            disabled={isNextDisabled}
          >
            <LinearGradient
              colors={['#7fffd4', '#092f80']}
              style={styles.labMessengerButtonGradient}
            >
              <Text style={styles.labMessengerButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResearcherPage4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  header: {
    paddingTop: 20,
  },
  labMessengerHeader: {
    alignItems: 'center',
    paddingBottom: 20,
    fontVariant: ['small-caps'],
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FDFDFD',
    textAlign: 'center',
    marginBottom: 10,
    fontVariant: ['small-caps'],
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
  userTextHeader: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    fontVariant: ['small-caps'],
  },
  labMessengerTextHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontVariant: ['small-caps'],
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FDFDFD',
    textAlign: 'center',
    marginBottom: 10,
    fontVariant: ['small-caps'],
  },
  frame: {
    alignItems: 'center',
  },
  profilePictureContainer: {
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
  userTextHeader: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    fontVariant: ['small-caps'],
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#014576',
    textAlign: 'center',
    marginBottom: 10,
    fontVariant: ['small-caps'],
  },
  messageInputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#69a7d0',
  },
  messageInput: {
    padding: 10,
    fontSize: 16,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  prevButton: {
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
  },
  labMessengerButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  labMessengerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
