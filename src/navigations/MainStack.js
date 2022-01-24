import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tabs = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name={'home'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="My Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name={'shopping-bag'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name={'shopping-cart'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name={'person'} color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainStack;
