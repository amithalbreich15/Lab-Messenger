// // screens/ResearcherPage6.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ResearcherPage6 = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>This is Researcher Page 6</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default ResearcherPage6;


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import moment from 'moment';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const ResearcherPage6 = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const selectedMessages = route.params?.selectedMessages || 5;
//   const firstName = route.params?.firstName || 'Researcher';

//   // Initialize messageTimes with an array of messages, each containing an array of times
//   const [messageTimes, setMessageTimes] = useState(
//     Array(6)
//       .fill(0)
//       .map(() => Array(2).fill(null)) // Assuming 2 time slots per message
//   );

//   // Initialize visibility state for DateTimePickers
//   const [isDatePickerVisible, setIsDatePickerVisible] = useState(
//     Array(6)
//       .fill(0)
//       .map(() => Array(2).fill(false)) // Initialize with false for each time slot
//   );

//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
//   const [currentTimeSlotIndex, setCurrentTimeSlotIndex] = useState(0);

//   useEffect(() => {
//     // Initialize messageTimes with an array of messages, each containing an array of times
//     const initialMessageTimes = Array(6)
//       .fill(0)
//       .map(() => Array(2).fill(null)); // Assuming 2 time slots per message
//     setMessageTimes(initialMessageTimes);
//   }, [6]);

//   const showDatePicker = (messageIndex, timeSlotIndex) => {
//     setCurrentMessageIndex(messageIndex);
//     setCurrentTimeSlotIndex(timeSlotIndex);

//     // Create a copy of the visibility state array
//     const updatedVisibility = [...isDatePickerVisible];
//     // Set the visibility for the specific message and time slot to true
//     updatedVisibility[messageIndex][timeSlotIndex] = true;
//     setIsDatePickerVisible(updatedVisibility);
//   };

//   const hideDatePicker = () => {
//     // Create a copy of the visibility state array
//     const updatedVisibility = [...isDatePickerVisible];
//     // Set the visibility for the current message and time slot to false
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

//     navigation.navigate('ResearcherPage8', { messageTimes });
//   };

//   const handlePreviousClick = () => {
//     navigation.navigate('ResearcherPage5');
//   };

//   const isNextDisabled = messageTimes.some((times) => times.some((time) => !time));

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.titleHeader}>Lab Messenger</Text>
//       </View>
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
//                       <Text style={styles.radioLabel}>
//                         {time ? moment(time, 'HH:mm').format('hh:mm A') : 'Select Time'}
//                       </Text>
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
//         <TouchableOpacity onPress={handlePreviousClick} style={styles.button}>
//           <LinearGradient colors={['#69a7d0', '#092f80']} style={styles.labMessengerButtonGradient}>
//             <Text style={styles.labMessengerButtonText}>Previous</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleNextClick}
//           style={[styles.button, isNextDisabled && { opacity: 0.5 }]}
//           disabled={isNextDisabled}
//         >
//           <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.labMessengerButtonGradient}>
//             <Text style={styles.labMessengerButtonText}>Next</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

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
//     color: '#FDFDFD',
//     textAlign: 'center',
//     marginBottom: 10,
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
//     backgroundColor: 'rgba(1, 69, 118, 0.1)', // Partial blue background
//     paddingVertical: 10,
//   },
//   messageHeaderText: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: '#014576',
//     textAlign: 'center',
//   },
//   timeSlotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   timeSlot: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   andText: {
//     color: '#014576', // White text
//     marginHorizontal: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   radioItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   radioLabelContainer: {
//     flex: 1,
//     justifyContent: 'center', // Center-align the text vertically
//     alignItems: 'center', // Center-align the text horizontally
//   },
//   radioLabel: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#014576',
//     alignItems: 'center',
//   },
//   radioButtonContainer: {
//     alignItems: 'flex-start',
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 5,
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

// export default ResearcherPage6;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ResearcherPage6 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedMessages = route.params?.selectedMessages || 1;
  const firstName = route.params?.firstName || 'Researcher';

  // Initialize messageTimes with an array of messages, each containing an array of times
  const [messageTimes, setMessageTimes] = useState(
    Array(selectedMessages)
      .fill(0)
      .map(() => Array(2).fill(null)) // Assuming 2 time slots per message
  );

  // Initialize visibility state for DateTimePickers
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(
    Array(selectedMessages)
      .fill(0)
      .map(() => Array(2).fill(false)) // Initialize with false for each time slot
  );

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentTimeSlotIndex, setCurrentTimeSlotIndex] = useState(0);

  useEffect(() => {
    // Initialize messageTimes with an array of messages, each containing an array of times
    const initialMessageTimes = Array(selectedMessages)
      .fill(0)
      .map(() => Array(2).fill(null)); // Assuming 2 time slots per message
    setMessageTimes(initialMessageTimes);
  }, [selectedMessages]);

  const showDatePicker = (messageIndex, timeSlotIndex) => {
    setCurrentMessageIndex(messageIndex);
    setCurrentTimeSlotIndex(timeSlotIndex);

    // Create a copy of the visibility state array
    const updatedVisibility = [...isDatePickerVisible];
    // Set the visibility for the specific message and time slot to true
    updatedVisibility[messageIndex][timeSlotIndex] = true;
    setIsDatePickerVisible(updatedVisibility);
  };

  const hideDatePicker = () => {
    // Create a copy of the visibility state array
    const updatedVisibility = [...isDatePickerVisible];
    // Set the visibility for the current message and time slot to false
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
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Lab Messenger</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>{`Hello, ${firstName}!`}</Text>
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
          <LinearGradient colors={['#69a7d0', '#092f80']} style={styles.labMessengerButtonGradient}>
            <Text style={styles.labMessengerButtonText}>Previous</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextClick}
          style={[styles.button, isNextDisabled && { opacity: 0.5 }]}
          disabled={isNextDisabled}
        >
          <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.labMessengerButtonGradient}>
            <Text style={styles.labMessengerButtonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    paddingBottom: 60,
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FDFDFD',
    textAlign: 'center',
    marginBottom: 10,
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
  labMessengerButtonGradient: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  labMessengerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontVariant: ['small-caps'],
  },
});

export default ResearcherPage6;



