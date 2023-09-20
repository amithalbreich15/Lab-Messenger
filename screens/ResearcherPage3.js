import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
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

const CustomCheckbox = ({ label, isChecked, onPress }) => (
  <TouchableOpacity style={styles.checkbox} onPress={onPress}>
    {isChecked && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

const ResearcherPage3 = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [researcherName, setResearcherName] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const firstName = route?.params?.firstName || 'John Doe';
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  useEffect(() => {
    // Fetch the researcher's name from Firebase and set it in the state
    fetchResearcherName().then((name) => {
      setResearcherName(name);
    });
  }, []);

  const handleNextClick = () => {
    if (selectedDays.length > 0) {
      // You can use router.push or navigation.navigate to go to the next page
      // Example with navigation.navigate:
      navigation.navigate('ResearcherPage4'); // Replace 'NextPage' with your actual page name
    } else {
      // Show an error message to the user, indicating they must select at least one day.
      alert('Please select at least one day to proceed.');
    }
  };

  const handlePreviousClick = () => {
    // Navigate to the previous screen or page
    navigation.navigate('ResearcherPage2'); // This will take you back to the previous screen
  };

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      // If the day is already selected, remove it from the selection.
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      // If the day is not selected, add it to the selection.
      setSelectedDays([...selectedDays, day]);
    }
  };

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

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
      <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
        {/* Lab Messenger Header */}
        <View style={styles.labMessengerTextHeader}>
          <Text style={styles.titleHeader}>Lab Messenger</Text>
          <View style={styles.frame}>
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
            </View>
          <Text style={styles.userTextHeader}>Hello, {firstName}!</Text>
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.headerText}>
          Please mark which days of the week you would like to send the messages (multiple selection):
        </Text>
        <View style={styles.checkboxContainer}>
          {daysOfWeek.map((day) => (
            <View style={styles.checkboxWrapper} key={day}>
              <CustomCheckbox
                isChecked={selectedDays.includes(day)}
                onPress={() => toggleDaySelection(day)}
              />
              <Text style={styles.checkboxLabel}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.prevButton} onPress={() => navigation.goBack()}>
            <LinearGradient
              colors={['#69a7d0', '#092f80']}
              style={styles.labMessengerButtonGradient}
            >
              <Text style={styles.labMessengerButtonText}>Previous</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextClick}
            disabled={selectedDays.length === 0}
          >
            <LinearGradient
              colors={['#7fffd4', '#092f80']}
              style={[
                styles.labMessengerButtonGradient,
                selectedDays.length > 0 ? {} : styles.labMessengerDisabledButton,
              ]}
            >
              <Text style={styles.labMessengerButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResearcherPage3;

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
  labMessengerTextHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  labMessengerText: {
    color: '#014576',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  checkboxContainer: {
    alignItems: 'flex-start', // Align checkboxes to the left
    marginBottom: 20,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#014576',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  checkmark: {
    color: '#014576',
    fontSize: 18,
  },
  checkboxLabel: {
    color: '#014576',
    fontSize: 16,
    marginLeft: 10,
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
  labMessengerDisabledButton: {
    opacity: 0.5,
  },
  headerText: {
    fontWeight: 'bold', // Make the text bold
    fontSize: 20, // Adjust the font size as needed
    color: '#014576', // Your desired text color
    textAlign: 'center', // Center the text horizontally
    marginBottom: 10, // Add some spacing below the text
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
});


