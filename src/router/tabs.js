import React, { Component } from 'react';
import { BackHandler, Alert } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Mine, Message } from '../page';

const Tab = createBottomTabNavigator();

class Router extends Component {
  componentDidMount() {
    BackHandler.addEventListener('TabBackPress', this._backHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('TabBackPress', this._backHandle);
  }

  _backHandle = () => {
    if (!global.navigation.canGoBack()) {
      this._showExitAlert();
      return true;
    }
    return false;
  };

  _showExitAlert = () => {
    Alert.alert(
      '提示',
      '是否真的要退出应用?',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
    );
  };

  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Mine') {
              iconName = focused ? 'user' : 'user';
            } else if (route.name === 'Message') {
              iconName = focused ? 'message' : 'message';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}

        tabBarOptions={{
          activeTintColor: '#007AFF',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} options={{ title: '主页' }} />
        <Tab.Screen name="Message" component={Message} options={{ title: '消息' }} />
        <Tab.Screen name="Mine" component={Mine} options={{ title: '我的' }} />
      </Tab.Navigator>
    );
  }
}

export default Router;
