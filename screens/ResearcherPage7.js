// // screens/ResearcherPage7.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ResearcherPage7 = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>This is Researcher Page 7</Text>
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

// export default ResearcherPage7;


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

// const ResearcherPage7 = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const selectedMessages = route.params?.selectedMessages || 0;
//   const firstName = route.params?.firstName || 'Researcher';
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [messageTimes, setMessageTimes] = useState([]);
//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

//   useEffect(() => {
//     const initialMessageTimes = Array(10).fill(null); // Fix the Messages number to change accordingly
//     setMessageTimes(initialMessageTimes);
//   }, [10]);

//   const showDatePicker = (index) => {
//     setDatePickerVisibility(true);
//     setCurrentMessageIndex(index);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleDateConfirm = (date) => {
//     const updatedMessageTimes = [...messageTimes];
//     updatedMessageTimes[currentMessageIndex] = moment(date).format('HH:mm');
//     setMessageTimes(updatedMessageTimes);
//     hideDatePicker();
//   };

//   const handleNextClick = () => {
//     if (messageTimes.some((time) => !time)) {
//       Alert.alert(
//         'Error',
//         'All message dates and times should be filled before proceeding to the next page.'
//       );
//       return;
//     }

//     navigation.navigate('ResearcherPage8', { messageTimes });
//   };

//   const handlePreviousClick = () => {
//     navigation.navigate('ResearcherPage5');
//   };

//   const isNextDisabled = messageTimes.some((time) => !time);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.titleHeader}>Lab Messenger</Text>
//       </View>
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.headerText}>Hello, {firstName}!</Text>
//         <Text style={styles.headerText}>Please set the messages according to the order of hours:</Text>

//         {messageTimes.map((time, index) => (
//           <View key={index} style={styles.messageContainer}>
//             <View style={styles.messageHeader}>
//               <Text style={styles.messageHeaderText}>{`Message ${index + 1}`}</Text>
//             </View>
//             <View style={styles.radioItem}>
//               <TouchableOpacity onPress={() => showDatePicker(index)} style={styles.radioButtonContainer}>
//                 <View style={styles.radioLabelContainer}>
//                   {time ? (
//                     <Text style={styles.selectedTimeLabel}>
//                       {moment(time, 'HH:mm').format('hh:mm A')}
//                     </Text>
//                   ) : (
//                     <LinearGradient
//                       colors={['#7fffd4', '#092f80']}
//                       style={styles.selectTimeButton}
//                     >
//                       <Text style={styles.selectTimeButtonText}>Select Time</Text>
//                     </LinearGradient>
//                   )}
//                 </View>
//               </TouchableOpacity>
//               <DateTimePickerModal
//                 isVisible={isDatePickerVisible && currentMessageIndex === index}
//                 mode="time"
//                 onConfirm={handleDateConfirm}
//                 onCancel={hideDatePicker}
//               />
//             </View>
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
//     paddingBottom: 60, // Increased paddingBottom for white space at the bottom
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
//   },
//   messageHeader: {
//     backgroundColor: '#014576',
//     padding: 5,
//   },
//   messageHeaderText: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: '#FFF',
//     textAlign: 'center',
//     fontVariant: ['small-caps'],
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
//   selectedTimeLabel: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#014576',
//     alignItems: 'center',
//   },
//   selectTimeButton: {
//     flex: 1,
//     borderRadius: 20, // Make it round
//     alignItems: 'center', // Center-align content
//     justifyContent: 'center', // Center-align content
//     padding: 5, // Padding for the button
//   },
//   selectTimeButtonText: {
//     color: '#fff', // Text color
//     fontSize: 16, // Text size
//     fontWeight: 'bold', // Bold text
//     fontVariant: ['small-caps'],
//   },
//   radioButtonContainer: {
//     alignItems: 'flex-start',
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 10, // Added paddingVertical for white space at the bottom
//     backgroundColor: '#fff', // Background color for the bottom container
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

// export default ResearcherPage7;

import ResearcherPage2 from '../screens/ResearcherPage2.js';
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

const ResearcherPage7 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedMessages = route.params?.ResearcherPage2.selectedMessages || 2;
  const firstName = route.params?.firstName || 'Researcher';
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [messageTimes, setMessageTimes] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const initialMessageTimes = Array(selectedMessages).fill(null); // Fix the Messages number to change accordingly
    setMessageTimes(initialMessageTimes);
  }, [selectedMessages]);

  const showDatePicker = (index) => {
    setDatePickerVisibility(true);
    setCurrentMessageIndex(index);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const updatedMessageTimes = [...messageTimes];
    updatedMessageTimes[currentMessageIndex] = moment(date).format('HH:mm');
    setMessageTimes(updatedMessageTimes);
    hideDatePicker();
  };

  const handleNextClick = () => {
    if (messageTimes.some((time) => !time)) {
      Alert.alert(
        'Error',
        'All message dates and times should be filled before proceeding to the next page.'
      );
      return;
    }

    // Check if message times are in ascending order
    for (let i = 1; i < messageTimes.length; i++) {
      if (
        messageTimes[i] &&
        moment(messageTimes[i], 'HH:mm').isBefore(moment(messageTimes[i - 1], 'HH:mm'))
      ) {
        Alert.alert(
          'Error',
          'Message Times should be chronological in ascending order. Please select a later time.'
        );
        return;
      }
    }

    navigation.navigate('ResearcherPage8A', { messageTimes });
  };

  const handlePreviousClick = () => {
    navigation.navigate('ResearcherPage5');
  };

  const isNextDisabled = messageTimes.some((time) => !time);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Lab Messenger</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>Hello, {firstName}!</Text>
        <Text style={styles.headerText}>Please set the messages according to the order of hours:</Text>

        {messageTimes.map((time, index) => (
          <View key={index} style={styles.messageContainer}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageHeaderText}>{`Message ${index + 1}`}</Text>
            </View>
            <View style={styles.radioItem}>
              <TouchableOpacity onPress={() => showDatePicker(index)} style={styles.radioButtonContainer}>
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
              <DateTimePickerModal
                isVisible={isDatePickerVisible && currentMessageIndex === index}
                mode="time"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
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
    paddingBottom: 60, // Increased paddingBottom for white space at the bottom
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
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
  },
  messageHeader: {
    backgroundColor: '#014576',
    padding: 5,
  },
  messageHeaderText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
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
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#014576',
    alignItems: 'center',
  },
  selectedTimeLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#014576',
    alignItems: 'center',
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
  radioButtonContainer: {
    alignItems: 'flex-start',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10, // Added paddingVertical for white space at the bottom
    backgroundColor: '#fff', // Background color for the bottom container
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
  },
});

export default ResearcherPage7;

