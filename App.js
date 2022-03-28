import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import {lightTheme} from './src/themes/light';
import CartScreen from './src/screens/CartScreen';
import MainStack from './src/navigations/MainStack';
import SearchScreen from './src/screens/SearchScreen';
import OrderScreen from './src/screens/OrderScreen';

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={lightTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen name={'Login'} component={LoginScreen} />
          <RootStack.Screen
            name={'Registration'}
            component={RegistrationScreen}
          />
          <RootStack.Screen name={'ShoppingApp'} component={MainStack} />
          <RootStack.Screen name={'Details'} component={DetailsScreen} />
          <RootStack.Screen name={'Search'} component={SearchScreen} />
          <RootStack.Screen name={'Cart'} component={CartScreen} />
          <RootStack.Screen name={'Order'} component={OrderScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
