import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuPageComponent from '../components/pages/main_page/a_menu_page/menu_page.component';
import BookingTableComponent from '../components/pages/main_page/a_booking_table_page/booking_table_page.component';
import AdminPageComponent from '../components/pages/main_page/a_admin_panel/admin_page.component';

const HomeStack = createNativeStackNavigator();

const HomeRouter = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="menu_page">
        <HomeStack.Screen name="menu_page" component={MenuPageComponent} />
        <HomeStack.Screen
          name="booking_table_page"
          component={BookingTableComponent}
        />

        <HomeStack.Screen name="admin_panel" component={AdminPageComponent} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeRouter;
