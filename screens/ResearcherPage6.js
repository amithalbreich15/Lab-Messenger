// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Alert,
//   Image,
// } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import moment from 'moment';
// import * as Animatable from 'react-native-animatable';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const ResearcherPage6 = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const selectedMessages = route.params?.selectedMessages || 1;
//   const firstName = route.params?.firstName || 'John Doe';
//   const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

//   const [messageTimes, setMessageTimes] = useState(
//     Array(selectedMessages)
//       .fill(0)
//       .map(() => Array(2).fill(null))
//   );

//   const [isDatePickerVisible, setIsDatePickerVisible] = useState(
//     Array(selectedMessages)
//       .fill(0)
//       .map(() => Array(2).fill(false))
//   );

//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
//   const [currentTimeSlotIndex, setCurrentTimeSlotIndex] = useState(0);

//   useEffect(() => {
//     const initialMessageTimes = Array(selectedMessages)
//       .fill(0)
//       .map(() => Array(2).fill(null));
//     setMessageTimes(initialMessageTimes);
//   }, [selectedMessages]);

//   const showDatePicker = (messageIndex, timeSlotIndex) => {
//     setCurrentMessageIndex(messageIndex);
//     setCurrentTimeSlotIndex(timeSlotIndex);

//     const updatedVisibility = [...isDatePickerVisible];
//     updatedVisibility[messageIndex][timeSlotIndex] = true;
//     setIsDatePickerVisible(updatedVisibility);
//   };

//   const hideDatePicker = () => {
//     const updatedVisibility = [...isDatePickerVisible];
//     updatedVisibility[currentMessageIndex][currentTimeSlotIndex] = false;
//     setIsDatePickerVisible(updatedVisibility);
//   };

//   const handleDateConfirm = (date) => {
//     const updatedMessageTimes = [...messageTimes];
//     updatedMessageTimes[currentMessageIndex][currentTimeSlotIndex] = moment(date).format('HH:mm');
//     setMessageTimes(updatedMessageTimes);
//     hideDatePicker();
//   };

//   const handleNextClick = () => {
//     if (messageTimes.some((times) => times.some((time) => !time))) {
//       Alert.alert(
//         'Error',
//         'All message times should be filled before proceeding to the next page.'
//       );
//       return;
//     }

//     navigation.navigate('ResearcherPage8B', { messageTimes });
//   };

//   const handlePreviousClick = () => {
//     navigation.navigate('ResearcherPage5');
//   };

//   const isNextDisabled = messageTimes.some((times) => times.some((time) => !time));

//   return (
//     <View style={styles.container}>
//       <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
//         <View style={styles.labMessengerTextHeader}>
//           <Text style={styles.titleHeader}>Lab Messenger</Text>
//           <View style={styles.profilePictureContainer}>
//             {/* Profile Picture */}
//             {profilePicture ? (
//               <Animatable.Image
//                 animation='fadeIn'
//                 duration={1000}
//                 source={{ uri: profilePicture }}
//                 style={styles.profilePicture}
//               />
//             ) : (
//               <View style={styles.profilePicturePlaceholder}>
//                 <Animatable.Image
//                   animation='fadeIn'
//                   duration={1000}
//                   source={require('../assets/images/user.png')}
//                   style={styles.profilePicture}
//                 />
//               </View>
//             )}
//           </View>
//           <Text style={styles.userTextHeader}>Hello, {firstName}!</Text>
//         </View>
//       </LinearGradient>
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.headerText}>{`Hello, ${firstName}!`}</Text>
//         <Text style={styles.headerText}>Please set the messages according to the order of hours:</Text>

//         {messageTimes.map((times, messageIndex) => (
//           <View key={messageIndex} style={styles.messageContainer}>
//             <Text style={styles.messageHeaderText}>{`Message ${messageIndex + 1}: between the hours`}</Text>
//             <View style={styles.timeSlotsContainer}>
//               {times.map((time, timeSlotIndex) => (
//                 <View key={timeSlotIndex} style={styles.timeSlot}>
//                   <TouchableOpacity
//                     onPress={() => showDatePicker(messageIndex, timeSlotIndex)}
//                     style={styles.radioButtonContainer}
//                   >
//                     <View style={styles.radioLabelContainer}>
//                       {time ? (
//                         <Text style={styles.selectedTimeLabel}>
//                           {moment(time, 'HH:mm').format('hh:mm A')}
//                         </Text>
//                       ) : (
//                         <LinearGradient
//                           colors={['#7fffd4', '#092f80']}
//                           style={styles.selectTimeButton}
//                         >
//                           <Text style={styles.selectTimeButtonText}>Select Time</Text>
//                         </LinearGradient>
//                       )}
//                     </View>
//                   </TouchableOpacity>
//                   {timeSlotIndex === 0 && (
//                     <Text style={styles.andText}>and</Text>
//                   )}
//                 </View>
//               ))}
//             </View>
//             {times.map((time, timeSlotIndex) => (
//               <DateTimePickerModal
//                 key={timeSlotIndex}
//                 isVisible={isDatePickerVisible[messageIndex][timeSlotIndex]}
//                 mode="time"
//                 onConfirm={handleDateConfirm}
//                 onCancel={hideDatePicker}
//               />
//             ))}
//           </View>
//         ))}
//       </ScrollView>
//       <View style={styles.bottomContainer}>
//   <TouchableOpacity onPress={handlePreviousClick} style={styles.button}>
//     <LinearGradient colors={['#69a7d0', '#092f80']} style={styles.buttonGradient}>
//       <Text style={styles.buttonText}>Previous</Text>
//     </LinearGradient>
//   </TouchableOpacity>

//   <TouchableOpacity
//     onPress={handleNextClick}
//     style={[styles.button, isNextDisabled && { opacity: 0.5 }]}
//     disabled={isNextDisabled}
//   >
//     <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.buttonGradient}>
//       <Text style={styles.buttonText}>Next</Text>
//     </LinearGradient>
//   </TouchableOpacity>
// </View>
//     </View>
//   );
// };

// export default ResearcherPage6;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#014576',
//   },
//   header: {
//     justifyContent: 'flex-end',
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   content: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingBottom: 60,
//   },
//   titleHeader: {
//     fontWeight: 'bold',
//     fontSize: 40,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 10,
//     fontVariant: ['small-caps'],
//   },
//   labMessengerTextHeader: {
//     alignItems: 'center', // Center-align the text and image horizontally
//     marginBottom: 10,
//   },
//   profilePictureContainer: {
//     marginTop: 10, // Add margin to separate the image from the text
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profilePicture: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   profilePicturePlaceholder: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   userTextHeader: {
//     fontWeight: 'bold',
//     fontSize: 24,
//     color: '#fff',
//     marginBottom: 10,
//     textAlign: 'center',
//     fontVariant: ['small-caps'],
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     color: '#014576',
//     textAlign: 'center',
//     marginBottom: 10,
//     fontVariant: ['small-caps'],
//   },
//   messageContainer: {
//     borderColor: '#014576',
//     borderWidth: 2,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   messageHeaderText: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: '#014576',
//     textAlign: 'center',
//     fontVariant: ['small-caps'],
//   },
//   timeSlotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   timeSlot: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   andText: {
//     marginLeft: 5,
//     marginRight: 5,
//     fontSize: 18,
//     color: '#014576',
//     fontWeight: 'bold',
//   },
//   selectTimeButton: {
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 5,
//   },
//   selectTimeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     fontVariant: ['small-caps'],
//   },
//   radioButtonContainer: {
//     alignItems: 'flex-start',
//   },
//   selectedTimeLabel: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#014576',
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 20, // Increase vertical padding for spacing
//     backgroundColor: '#fff',
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   buttonGradient: {
//     borderRadius: 5,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   labMessengerButtonGradient: {
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   labMessengerButtonText: {
//     color: '#fff',
//     fontSize: 16,
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
  Alert,
  Image,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ResearcherPage6 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedMessages = route.params?.selectedMessages || 10;
  const firstName = route.params?.firstName || 'Researcher';
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  const [messageTimes, setMessageTimes] = useState(
    Array(selectedMessages)
      .fill(0)
      .map(() => Array(2).fill(null))
  );

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(
    Array(selectedMessages)
      .fill(0)
      .map(() => Array(2).fill(false))
  );

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentTimeSlotIndex, setCurrentTimeSlotIndex] = useState(0);

  useEffect(() => {
    const initialMessageTimes = Array(selectedMessages)
      .fill(0)
      .map(() => Array(2).fill(null));
    setMessageTimes(initialMessageTimes);
  }, [selectedMessages]);

  const showDatePicker = (messageIndex, timeSlotIndex) => {
    setCurrentMessageIndex(messageIndex);
    setCurrentTimeSlotIndex(timeSlotIndex);

    const updatedVisibility = [...isDatePickerVisible];
    updatedVisibility[messageIndex][timeSlotIndex] = true;
    setIsDatePickerVisible(updatedVisibility);
  };

  const hideDatePicker = () => {
    const updatedVisibility = [...isDatePickerVisible];
    updatedVisibility[currentMessageIndex][currentTimeSlotIndex] = false;
    setIsDatePickerVisible(updatedVisibility);
  };

  const handleDateConfirm = (date) => {
    const updatedMessageTimes = [...messageTimes];
    updatedMessageTimes[currentMessageIndex][currentTimeSlotIndex] = moment(date).format('HH:mm');
    setMessageTimes(updatedMessageTimes);
    hideDatePicker();
  };

  const handleNextClick = () => {
    if (messageTimes.some((times) => times.some((time) => !time))) {
      Alert.alert(
        'Error',
        'All message times should be filled before proceeding to the next page.'
      );
      return;
    }

    navigation.navigate('ResearcherPage8B', { messageTimes });
  };

  const handlePreviousClick = () => {
    navigation.navigate('ResearcherPage5');
  };

  const isNextDisabled = messageTimes.some((times) => times.some((time) => !time));

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#014576', '#014576']} style={styles.header}>
        <View style={styles.labMessengerTextHeader}>
          <Text style={styles.titleHeader}>Lab Messenger</Text>
          <Text style={styles.userTextHeader}>Hello, {firstName}!</Text>
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
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>Please set the messages according to the order of hours:</Text>

        {messageTimes.map((times, messageIndex) => (
          <View key={messageIndex} style={styles.messageContainer}>
            <Text style={styles.messageHeaderText}>{`Message ${messageIndex + 1}: between the hours`}</Text>
            <View style={styles.timeSlotsContainer}>
              {times.map((time, timeSlotIndex) => (
                <View key={timeSlotIndex} style={styles.timeSlot}>
                  <TouchableOpacity
                    onPress={() => showDatePicker(messageIndex, timeSlotIndex)}
                    style={styles.radioButtonContainer}
                  >
                    <View style={styles.radioLabelContainer}>
                      {time ? (
                        <Text style={styles.selectedTimeLabel}>
                          {moment(time, 'HH:mm').format('hh:mm A')}
                        </Text>
                      ) : (
                        <LinearGradient
                          colors={['#7fffd4', '#092f80']}
                          style={styles.selectTimeButton}
                        >
                          <Text style={styles.selectTimeButtonText}>Select Time</Text>
                        </LinearGradient>
                      )}
                    </View>
                  </TouchableOpacity>
                  {timeSlotIndex === 0 && (
                    <Text style={styles.andText}>and</Text>
                  )}
                </View>
              ))}
            </View>
            {times.map((time, timeSlotIndex) => (
              <DateTimePickerModal
                key={timeSlotIndex}
                isVisible={isDatePickerVisible[messageIndex][timeSlotIndex]}
                mode="time"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handlePreviousClick} style={styles.button}>
          <LinearGradient colors={['#69a7d0', '#092f80']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Previous</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextClick}
          style={[styles.button, isNextDisabled && { opacity: 0.5 }]}
          disabled={isNextDisabled}
        >
          <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResearcherPage6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014576',
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 20, // Reduced vertical padding
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontVariant: ['small-caps'],
  },
  labMessengerTextHeader: {
    alignItems: 'center', // Center-align the text and image horizontally
    marginBottom: 10,
  },
  profilePictureContainer: {
    marginTop: 10, // Add margin to separate the image from the text
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
    color: '#fff',
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
  messageContainer: {
    borderColor: '#014576',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'rgba(1, 69, 118, 0.1)', // Partial blue background
    paddingVertical: 10,
  },
  messageHeaderText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#014576',
    textAlign: 'center',
    fontVariant: ['small-caps'],
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  andText: {
    color: '#014576', // White text
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  radioLabelContainer: {
    flex: 1,
    justifyContent: 'center', // Center-align the text vertically
    alignItems: 'center', // Center-align the text horizontally
  },
  selectTimeButton: {
    flex: 1,
    borderRadius: 20, // Make it round
    alignItems: 'center', // Center-align content
    justifyContent: 'center', // Center-align content
    padding: 5, // Padding for the button
  },
  selectTimeButtonText: {
    color: '#fff', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Bold text
    fontVariant: ['small-caps'],
  },
  selectedTimeLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#014576',
    alignItems: 'center',
  },
  radioButtonContainer: {
    alignItems: 'flex-start',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonGradient: {
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

