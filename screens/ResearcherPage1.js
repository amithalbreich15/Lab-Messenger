// import * as firebase from 'firebase/app';
// // import 'firebase/database'; // Import only the specific Firebase services you need
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';

// const ResearcherPage1 = () => {
//   const [researcherName, setResearcherName] = useState('');
//   const [participantNumber, setParticipantNumber] = useState('');
//   const [participantMobile, setParticipantMobile] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');


//   const navigation = useNavigation();

//   useEffect(() => {
//     // Fetch the researcher's name from Firebase and set it in the state
//     // Replace this with your Firebase query logic
//     fetchResearcherName().then((name) => {
//       setResearcherName(name);
//     });
//   }, []);

//   const handleSendMessageClick = async () => {
//     setErrorMessage('');

//     if (!participantNumber || !participantMobile) {
//       setErrorMessage('Please provide both participant number and mobile.');
//       return;
//     }

//     // // Check if the recipient researcher's details exist in Firebase
//     // const researcherExists = await checkResearcherExists(
//     //   researcherName,
//     //   participantNumber,
//     //   participantMobile
//     // );

//     // if (!researcherExists) {
//     //   setErrorMessage('Recipient researcher does not exist in the system.');
//     //   return;
//     // }

//     // If the researcher exists, navigate to the next screen
//     navigation.navigate('ResearcherPage2');
//   };

//   const firebaseConfig = {
//     apiKey: 'YOUR_API_KEY',
//     authDomain: 'YOUR_AUTH_DOMAIN',
//     projectId: 'YOUR_PROJECT_ID',
//     storageBucket: 'YOUR_STORAGE_BUCKET',
//     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//     appId: 'YOUR_APP_ID',
//   };
  
//   // Initialize Firebase if not already initialized
//   // if (!firebase.apps.length) {
//   //   firebase.initializeApp(firebaseConfig);
//   // }

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

//   const fetchResearcherName = async () => {
//     try {
//       // Reference to the Firebase Realtime Database
//       const databaseRef = firebase.database().ref();
  
//       // Query the database to get the researcher's name
//       const snapshot = await databaseRef.child('researchers').child('researcher1').child('name').once('value');
  
//       // Extract the researcher's name from the snapshot
//       const researcherName = snapshot.val();
  
//       return researcherName;
//     } catch (error) {
//       console.error('Error fetching researcher name:', error);
//       return null;
//     }
//   };
  
//   // const checkResearcherExists = async (researcherName, participantNumber, participantMobile) => {
//   //   try {
//   //     // Reference to the Firebase Realtime Database
//   //     const databaseRef = firebase.database().ref();
  
//   //     // Query the database to check if the recipient researcher's details exist
//   //     const snapshot = await databaseRef.child('researchers').child('researcher1').once('value');
  
//   //     // Extract researcher details from the snapshot
//   //     const researcherDetails = snapshot.val();
  
//   //     // Check if the researcher's details match the provided information
//   //     if (
//   //       researcherDetails &&
//   //       researcherDetails.name === researcherName &&
//   //       researcherDetails.participantNumber === participantNumber &&
//   //       researcherDetails.participantMobile === participantMobile
//   //     ) {
//   //       return true; // Researcher exists
//   //     } else {
//   //       return false; // Researcher does not exist
//   //     }
//   //   } catch (error) {
//   //     console.error('Error checking researcher existence:', error);
//   //     return false;
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.titleHeader}>Hello, {researcherName}!</Text>
//       <ScrollView style={styles.scrollView}>
//         <Text style={styles.headerText}>Participant number to which you would like to send messages:</Text>
//         <TextInput
//           placeholder="Participant number"
//           style={styles.textInput}
//           value={participantNumber}
//           onChangeText={(text) => setParticipantNumber(text)}
//         />
        
//         <Text style={styles.text_footer}>Participant's mobile phone number:</Text>
//         <TextInput
//           placeholder="Participant's mobile phone number"
//           style={styles.textInput}
//           value={participantMobile}
//           onChangeText={(text) => setParticipantMobile(text)}
//         />
        
//         <TouchableOpacity onPress={handleSendMessageClick}>
//         <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.signIn}>
//           <Text style={[styles.textSign, { color: '#fff' }]}>Continue</Text>
//         </LinearGradient>
//       </TouchableOpacity>
        
//         {errorMessage ? <Text style={styles.errorMsg}>{errorMessage}</Text> : null}
//       </ScrollView>
//     </View>
//   );
// };

// export default ResearcherPage1;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#014576',
//   },
//   text_header: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 40,
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   text_footer: {
//     color: '#014576',
//     fontSize: 18,
//     marginTop: 20,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#014576',
//     borderRadius: 10,
//     marginTop: 10,
//     paddingHorizontal: 20,
//   },
//   signIn: {
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   textSign: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   errorMsg: {
//     color: 'red',
//     fontSize: 14,
//     marginTop: 10,
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
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const ResearcherPage1 = () => {
  const [researcherName, setResearcherName] = useState('');
  const [participantNumber, setParticipantNumber] = useState('');
  const [participantMobile, setParticipantMobile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const route = useRoute();
  const navigation = useNavigation();
  const firstName = route.params?.firstName || 'John Doe';

  useEffect(() => {
    // Fetch the researcher's name from Firebase and set it in the state
    // Replace this with your Firebase query logic
    fetchResearcherName().then((name) => {
      setResearcherName(name);
    });
  }, []);

  const handleSendMessageClick = async () => {
    setErrorMessage('');

    if (!participantNumber || !participantMobile) {
      setErrorMessage('Please provide both participant number and mobile.');
      return;
    }

    // Check if the recipient researcher's details exist in Firebase
    // const researcherExists = await checkResearcherExists(
    //   researcherName,
    //   participantNumber,
    //   participantMobile
    // );

    // if (!researcherExists) {
    //   setErrorMessage('Recipient researcher does not exist in the system.');
    //   return;
    // }

    // If the researcher exists, navigate to the next screen
    navigation.navigate('ResearcherPage2');
  };

  const fetchResearcherName = async () => {
    try {
      // Reference to the Firebase Realtime Database
      const databaseRef = firebase.database().ref();

      // Query the database to get the researcher's name
      const snapshot = await databaseRef
        .child('researchers')
        .child('researcher1')
        .child('name')
        .once('value');

      // Extract the researcher's name from the snapshot
      const researcherName = snapshot.val();

      return researcherName;
    } catch (error) {
      console.error('Error fetching researcher name:', error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
        <View style={styles.labMessengerHeader}>
          <Text style={styles.titleHeader}>Lab Messenger</Text>
          <Animatable.Image
            animation='fadeIn'
            duration={1000}
            source={require('../assets/images/user.png')} // Replace with your custom image
            style={styles.profilePicture}
          />
          <Text style={styles.userTextHeader}>Hello, {firstName}!</Text>
        </View>
      </LinearGradient>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>Participant number to which you would like to send messages:</Text>
        <TextInput
          placeholder="Participant number"
          style={styles.textInput}
          value={participantNumber}
          onChangeText={(text) => setParticipantNumber(text)}
        />
        
        <Text style={styles.text_footer}>Participant's mobile phone number:</Text>
        <TextInput
          placeholder="Participant's mobile phone number"
          style={styles.textInput}
          value={participantMobile}
          onChangeText={(text) => setParticipantMobile(text)}
        />
        
        <TouchableOpacity onPress={handleSendMessageClick}>
          <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.signIn}>
            <Text style={[styles.textSign, { color: '#fff' }]}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        {errorMessage ? <Text style={styles.errorMsg}>{errorMessage}</Text> : null}
      </ScrollView>
    </View>
  );
};

export default ResearcherPage1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014576',
  },
  header: {
    paddingTop: 20,
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
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text_footer: {
    color: '#014576',
    fontSize: 18,
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#014576',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMsg: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#014576',
    textAlign: 'center',
    marginBottom: 10,
  },
});
