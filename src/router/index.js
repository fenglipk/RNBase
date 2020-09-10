import * as React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import List from '../page/list';
import Tabs from './tabs';

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#24ABF2" barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleContainerStyle: { alignItems: 'center', flex: 1 },
          headerRightContainerStyle: {},
          headerLeftContainerStyle: {}
        }}
        // mode="modal"
      >
        {/* 测试页面 */}
        <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
        {/* 首页 */}
        <Stack.Screen name="Tabs" component={Tabs} options={{ title: '智能工厂', headerShown: false, animationTypeForReplace: 'push' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
