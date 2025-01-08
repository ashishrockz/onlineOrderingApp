import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Index from '../screens/Index';
import RecentOrdersOfUsers from '../components/recentOrdersOfUsers';
const Stack = createNativeStackNavigator();
const ComponentNavigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Index}/>
        <Stack.Screen name="RecentOrders" component={RecentOrdersOfUsers} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ComponentNavigations

const styles = StyleSheet.create({})