import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInComponent from '../components/pages/auth/a_sign_in/sign_in.component';
import SignUpComponent from '../components/pages/auth/a_sign_up/sign_up.component';

const AuthStack = createNativeStackNavigator();

const AuthRouter = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="sign_in">
        <AuthStack.Screen name="sign_in" component={SignInComponent} />
        <AuthStack.Screen name="sign_up" component={SignUpComponent} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthRouter;
