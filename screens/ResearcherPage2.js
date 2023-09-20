// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import ModalSelector from 'react-native-modal-selector';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, get } from 'firebase/database';

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

// const ResearcherPage2 = () => {
//   const [researcherName, setResearcherName] = useState('');
//   const [selectedMessages, setSelectedMessages] = useState(null);
//   const [selectedMessagesPerDay, setSelectedMessagesPerDay] = useState(null);
//   const [isContinueEnabled, setIsContinueEnabled] = useState(false);

//   const navigation = useNavigation();

//   useEffect(() => {
//     // Fetch the researcher's name from Firebase and set it in the state
//     fetchResearcherName().then((name) => {
//       setResearcherName(name);
//     });
//   }, []);

//   const handleNextClick = () => {
//     // Implement logic to navigate to the next step or page
//     // You can use navigation.navigate() to go to the next page
//     if (isContinueEnabled) {
//       navigation.navigate('ResearcherPage3');
//     }
//   };

//   const handlePreviousClick = () => {
//     // Navigate to the previous screen or page
//     navigation.navigate('ResearcherPage1'); // This will take you back to the previous screen
//   };

//   const messagesOptions = Array.from({ length: 60 }, (_, i) => ({ key: i + 1, label: `${i + 1}` }));
//   const messagesPerDayOptions = Array.from({ length: 24 }, (_, i) => ({ key: i + 1, label: `${i + 1}` }));

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
  
//   useEffect(() => {
//     // Enable the Continue button when both selectors have a value
//     setIsContinueEnabled(selectedMessages !== null && selectedMessagesPerDay !== null);
//   }, [selectedMessages, selectedMessagesPerDay]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
//         <Text style={styles.titleHeader}>Hello, {researcherName}!</Text>
//       </LinearGradient>
//       <View style={styles.content}>
//         <Text style={styles.headerText}>Please select the number of messages to send to the participant:</Text>
//         <TouchableOpacity
//           style={styles.dropdownContainer}
//           onPress={() => {}}
//         >
//           <ModalSelector
//             data={messagesOptions}
//             initValue="Select"
//             onChange={(selectedMessages) => setSelectedMessages(selectedMessages.label)}
//             cancelText="Cancel"
//             style={styles.dropdown}
//           >
//             <Text style={styles.dropdownText}>{selectedMessages || 'Select'}</Text>
//           </ModalSelector>
//         </TouchableOpacity>

//         <Text style={styles.headerText}>Please select how many messages you would like to send per day:</Text>
//         <TouchableOpacity
//           style={styles.dropdownContainer}
//           onPress={() => {}}
//         >
//           <ModalSelector
//             data={messagesPerDayOptions}
//             initValue="Select"
//             onChange={(selectedMessagesPerDay) => setSelectedMessagesPerDay(selectedMessagesPerDay.label)}
//             cancelText="Cancel"
//             style={styles.dropdown}
//           >
//             <Text style={styles.dropdownText}>{selectedMessagesPerDay || 'Select'}</Text>
//           </ModalSelector>
//         </TouchableOpacity>

//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity style={styles.prevButton} onPress={handlePreviousClick}>
//             <LinearGradient colors={['#69a7d0', '#092f80']} style={styles.buttonGradient}>
//               <Text style={styles.buttonText}>Previous</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.nextButton, isContinueEnabled ? {} : styles.disabledButton]}
//             onPress={handleNextClick}
//             disabled={!isContinueEnabled}
//           >
//             <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.buttonGradient}>
//               <Text style={styles.buttonText}>Next</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ResearcherPage2;

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
//   text_header: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 24,
//     textAlign: 'center',
//   },
//   text: {
//     color: '#014576',
//     fontSize: 18,
//     marginTop: 20,
//     textAlign: 'center', // Center text horizontally
//   },
//   dropdownContainer: {
//     borderWidth: 1,
//     borderColor: '#69a7d0',
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 5,
//     width: '80%', // Adjust the width as needed
//   },
//   dropdown: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   dropdownText: {
//     color: '#014576',
//     fontSize: 16,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center', // Center buttons horizontally
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
//   buttonGradient: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
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
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image, // Added Image import
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import ModalSelector from 'react-native-modal-selector';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

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

const ResearcherPage2 = () => {
  const route = useRoute();
  const [researcherName, setResearcherName] = useState('');
  const [selectedMessages, setSelectedMessages] = useState(null);
  const [selectedMessagesPerDay, setSelectedMessagesPerDay] = useState(null);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const navigation = useNavigation();
  const firstName = route?.params?.firstName || 'Researcher';


  // useEffect(() => {
  //   // Fetch the researcher's name from Firebase and set it in the state
  //   fetchResearcherName().then((name) => {
  //     setResearcherName(name);
  //   });
  // }, []);

  const handleNextClick = () => {
    // Implement logic to navigate to the next step or page
    // You can use navigation.navigate() to go to the next page
    if (isContinueEnabled) {
      navigation.navigate('ResearcherPage3');
    }
  };

  const handlePreviousClick = () => {
    // Navigate to the previous screen or page
    navigation.navigate('ResearcherPage1'); // This will take you back to the previous screen
  };

  const messagesOptions = Array.from({ length: 60 }, (_, i) => ({ key: i + 1, label: `${i + 1}` }));
  const messagesPerDayOptions = Array.from({ length: 24 }, (_, i) => ({ key: i + 1, label: `${i + 1}` }));

  const fetchResearcherName = async () => {
    try {
      // Reference to the Firebase Realtime Database
      const databaseRef = ref(database);
  
      // Query the database to get the researcher's name
      const snapshot = await get(child(databaseRef, 'researchers/researcher1/name'));
  
      // Extract the researcher's name from the snapshot
      const researcherName = snapshot.val();
  
      return researcherName;
    } catch (error) {
      console.error('Error fetching researcher name:', error);
      return null;
    }
  };
  
  useEffect(() => {
    // Enable the Continue button when both selectors have a value
    setIsContinueEnabled(selectedMessages !== null && selectedMessagesPerDay !== null);
  }, [selectedMessages, selectedMessagesPerDay]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
        {/* Lab Messenger Header */}
        <View style={styles.labMessengerHeader}>
          <Text style={styles.titleHeader}>Lab Messenger</Text>
          <Text style={styles.userTextHeader}>Hello, {firstName}!</Text>
          {/* Profile Picture */}
          <Image
            source={require('../assets/images/user.png')} // Replace with the path to your image
            style={styles.profilePicture}
          />
          {/* "Hello, {firstName}" Text */}
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.headerText}>Please select the number of messages to send to the participant:</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => {}}
        >
          <ModalSelector
            data={messagesOptions}
            initValue="Select"
            onChange={(selectedMessages) => setSelectedMessages(selectedMessages.label)}
            cancelText="Cancel"
            style={styles.dropdown}
          >
            <Text style={styles.dropdownText}>{selectedMessages || 'Select'}</Text>
          </ModalSelector>
        </TouchableOpacity>

        <Text style={styles.headerText}>Please select how many messages you would like to send per day:</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => {}}
        >
          <ModalSelector
            data={messagesPerDayOptions}
            initValue="Select"
            onChange={(selectedMessagesPerDay) => setSelectedMessagesPerDay(selectedMessagesPerDay.label)}
            cancelText="Cancel"
            style={styles.dropdown}
          >
            <Text style={styles.dropdownText}>{selectedMessagesPerDay || 'Select'}</Text>
          </ModalSelector>
        </TouchableOpacity>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.prevButton} onPress={handlePreviousClick}>
            <LinearGradient colors={['#69a7d0', '#092f80']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Previous</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nextButton, isContinueEnabled ? {} : styles.disabledButton]}
            onPress={handleNextClick}
            disabled={!isContinueEnabled}
          >
            <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResearcherPage2;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#014576',
    minHeight: windowHeight,
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    flexGrow: 1,
    alignItems: 'center', // Center content vertically
  },
  labMessengerHeader: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FDFDFD',
    textAlign: 'center',
    marginBottom: 10,
    fontVariant: ['small-caps'],
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
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    color: '#014576',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#69a7d0',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
    width: '80%',
  },
  dropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  dropdownText: {
    color: '#014576',
    fontSize: 16,
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
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#014576',
    textAlign: 'center',
    marginBottom: 10,
  },
});
