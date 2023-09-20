import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton as PaperRadioButton } from 'react-native-paper';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import * as Animatable from 'react-native-animatable';

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

const ResearcherPage5 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [researcherName, setResearcherName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the researcher's name from Firebase and set it in the state
    fetchResearcherName().then((name) => {
      setResearcherName(name);
    });
  }, []);

  const handleNextClick = () => {
    if (selectedOption === 'option1') {
      navigation.navigate('ResearcherPage6');
    } else {
      navigation.navigate('ResearcherPage7');
    }
  };

  const handlePreviousClick = () => {
    navigation.navigate('ResearcherPage4');
  };

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Lab Messenger</Text>
      </View>
      <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
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
        </View>
        <Text style={styles.userTextHeader}>Hello, {researcherName}!</Text>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.headerText}>
          How would you like the messages to be sent to the participant during the day?
        </Text>
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioItem}>
            <PaperRadioButton.Item
              label="I will choose a range of hours and the messages will be sent in this range randomly."
              value="option1"
              status={selectedOption === 'option1' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('option1')}
              color="#014576" // Dark blue color for the dot
              style={styles.radioButtonItem}
            />
          </View>
          <View style={styles.radioItem}>
            <PaperRadioButton.Item
              label="I will choose specific hours."
              value="option2"
              status={selectedOption === 'option2' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('option2')}
              color="#014576" // Dark blue color for the dot
              style={styles.radioButtonItem}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.prevButton,
            ]}
            onPress={handlePreviousClick}
          >
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
              {
                opacity: selectedOption === null ? 0.5 : 1, // Adjust opacity based on selection
              },
            ]}
            onPress={handleNextClick}
            disabled={selectedOption === null} // Disable the button based on selection
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
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#014576',
    textAlign: 'center',
    marginBottom: 10,
    fontVariant: ['small-caps'],
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FDFDFD', // White or cream color
    textAlign: 'center',
    marginBottom: 10,
    fontVariant: ['small-caps'],
  },
  userTextHeader: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    fontVariant: ['small-caps'],
},
  radioButtonContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#014576',
  },
  radioButtonItem: {
    flexDirection: 'row-reverse', // Place the radio button on the left
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

export default ResearcherPage5;