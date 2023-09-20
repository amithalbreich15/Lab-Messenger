// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import SplashScreen from '../screens/SplashScreen.js';
// import SignUpScreen from '../screens/SignUpScreen.js';
// import SignInScreen from '../screens/FirstLogin.js';
// import ResearcherPage1 from '../screens/ResearcherPage1.js'; // Make sure you import the correct components
// import ResearcherPage2 from '../screens/ResearcherPage2.js';
// import ResearcherPage3 from '../screens/ResearcherPage3.js';
// import ResearcherPage4 from '../screens/ResearcherPage4.js';
// import ResearcherPage5 from '../screens/ResearcherPage5.js';
// import ResearcherPage6 from '../screens/ResearcherPage6.js';
// import ResearcherPage7 from '../screens/ResearcherPage7.js';

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer independent={true}>
//       <Stack.Navigator initialRouteName="SplashScreen">
//         <Stack.Screen name="SplashScreen" component={SplashScreen} />
//         <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
//         <Stack.Screen name="SignInScreen" component={SignInScreen} />
//         <Stack.Screen name="ResearcherPage1" component={ResearcherPage1} />
//         <Stack.Screen name="ResearcherPage2" component={ResearcherPage2} />
//         <Stack.Screen name="ResearcherPage3" component={ResearcherPage3} />
//         <Stack.Screen name="ResearcherPage4" component={ResearcherPage4} />
//         <Stack.Screen name="ResearcherPage5" component={ResearcherPage5} />
//         <Stack.Screen name="ResearcherPage6" component={ResearcherPage6} />
//         <Stack.Screen name="ResearcherPage7" component={ResearcherPage7} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import 'react-native-gesture-handler'; // Import this at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen.js';
import SignUpScreen from '../screens/SignUpScreen.js';
import SignInScreen from '../screens/FirstLogin.js';
import ResearcherPage1 from '../screens/ResearcherPage1.js';
import ResearcherPage2 from '../screens/ResearcherPage2.js';
import ResearcherPage3 from '../screens/ResearcherPage3.js';
import ResearcherPage4 from '../screens/ResearcherPage4.js';
import ResearcherPage5 from '../screens/ResearcherPage5.js';
import ResearcherPage6 from '../screens/ResearcherPage6.js';
import ResearcherPage7 from '../screens/ResearcherPage7.js';
import ResearcherPage8A from '../screens/ResearcherPage8A.js';
import ResearcherPage8B from '../screens/ResearcherPage8B.js';
import EndScreen from '../screens/EndScreen.js';
import OTPScreen from '../screens/OTPScreen.js';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="OTPScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ResearcherPage1" component={ResearcherPage1} />
        <Stack.Screen name="ResearcherPage2" component={ResearcherPage2} />
        <Stack.Screen name="ResearcherPage3" component={ResearcherPage3} />
        <Stack.Screen name="ResearcherPage4" component={ResearcherPage4} />
        <Stack.Screen name="ResearcherPage5" component={ResearcherPage5} />
        <Stack.Screen name="ResearcherPage6" component={ResearcherPage6} />
        <Stack.Screen name="ResearcherPage7" component={ResearcherPage7} />
        <Stack.Screen name="ResearcherPage8A" component={ResearcherPage8A} />
        <Stack.Screen name="ResearcherPage8B" component={ResearcherPage8B} />
        <Stack.Screen name="EndScreen" component={EndScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

