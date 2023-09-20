
    import React, { useState } from 'react';
    import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
    import { useNavigation, useRoute } from '@react-navigation/native';
    import { LinearGradient } from 'expo-linear-gradient';
    import * as Animatable from 'react-native-animatable';

    const ResearcherPage8B = ({ messageTimes }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

    const selectedDays = route?.params?.selectedDays || ['Sunday', 'Monday', 'Thursday'];
    const selectedMessages = route?.params?.selectedMessages || 4;
    const selectedMessagesPerDay = route?.params?.selectedMessagesPerDay || 4;
    const mobilePhoneNumber = route?.params?.mobilePhoneNumber || '123-456-7890';
    const participantNumber = route?.params?.participantNumber || '987';
    const firstName = route?.params?.firstName || 'Researcher';

    const handleConfirm = () => {
        // Handle confirmation logic here
        navigation.navigate('EndScreen'); // Navigate to EndScreen
    };

    const handleReturn = () => {
        navigation.navigate('ResearcherPage7');
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.titleHeader}>Lab Messenger</Text>
            <Text style={styles.frameHeader}>Hello, {firstName}!</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
            <Text style={styles.frameHeader}>Terms and Conditions of Service</Text>
            <ScrollView style={styles.textScroll}>
                <Text style={styles.textContent}>
                By clicking the "I confirm" button that:
                </Text>
                <Text style={styles.textContent}>
                I chose to send text messages to participant number: {participantNumber}
                </Text>
                <Text style={styles.textContent}>
                Participant's phone number: {mobilePhoneNumber}
                </Text>
                <Text style={styles.textContent}>
                I chose to send messages for {selectedDays} days
                </Text>
                <Text style={styles.textContent}>
                I chose to send {selectedMessages} messages a day at random times in the following ranges:
                </Text>
                {/* Render selected message times here */}
                {Array.from({ length: selectedMessagesPerDay }, (_, i) => (
                <Text key={i} style={styles.textContent}>
                    I chose to send the {i + 1} message between XX:XX and XX:XX
                </Text>
                ))}
                <Text style={styles.textContent}>
                I chose to send the messages on the following days: {Array.isArray(selectedDays) ? selectedDays.join(', ') : ''}
                </Text>
            </ScrollView>
            </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={handleReturn} style={styles.button}>
            <LinearGradient colors={['#69a7d0', '#092f80']} style={styles.labMessengerButtonGradient}>
                <Text style={styles.labMessengerButtonText}>Return</Text>
            </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={styles.button}>
            <LinearGradient colors={['#7fffd4', '#092f80']} style={styles.labMessengerButtonGradient}>
                <Text style={styles.labMessengerButtonText}>I Confirm</Text>
            </LinearGradient>
            </TouchableOpacity>
        </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    scrollContent: {
        flexGrow: 1,
        color: '#FFFFFF',
    },
    frame: {
        backgroundColor: '#014576',
        borderRadius: 10,
        padding: 20,
        margin: 20,
    },
    frameHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontVariant: ['small-caps'],
    },
    titleHeader: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#014576',
        textAlign: 'center',
        marginTop: 20,
        fontVariant: ['small-caps'],
      },
    textContent: {
        fontSize: 16,
        color: '#014576',
        marginBottom: 10,
        fontVariant: ['small-caps'],
    },
    textScroll: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
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

    export default ResearcherPage8B;
