// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Icon } from '@ant-design/react-native';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Icon name="account-book" size="md" color="red" />
//       <Button
//         title="去第二个页面"
//         onPress={() => navigation.navigate('Home1')}
//       />
//       <StatusBar backgroundColor="blue" barStyle="light-content" />
//     </View>
//   );
// }

// function HomeScreen1({ navigation }) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'flex-end'
//       }}
//     >
//       <StatusBar backgroundColor="red" barStyle="light-content" />
//       <Button
//         title="去第一个页面"
//         onPress={() => navigation.navigate('Home')}
//       />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Home1" component={HomeScreen1} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import Boot from './src/boot';

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;

export default Boot;
