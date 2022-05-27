import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInComponent from '../components/pages/auth/a_sign_in/sign_in.component';
import {
  Text,
  View,
} from 'react-native';

const AuthStack = createNativeStackNavigator();

const AuthRouter = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="sign_in">
        <AuthStack.Screen name="sign_in" component={SignInComponent} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthRouter;
