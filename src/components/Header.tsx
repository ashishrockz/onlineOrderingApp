import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useContext } from 'react';
import ChefgaLogo from './assets/ChefgaLogo';
import { loginToken } from '../hooks/AuthuContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const Header = ({onLogoPress}:any) => {
  const logout = async () =>{
    await AsyncStorage.removeItem('userToken');
    setToken(false)
  }
  const {setToken} = useContext(loginToken);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <ChefgaLogo onPress={onLogoPress} />
      <TouchableOpacity onPress={()=> logout()}>
          <Image source={require('../assets/logout.png')} style={styles.logoutImage}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
 
export default Header;
 
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    justifyContent:'center',
    borderBottomColor: '#ddd',
    paddingLeft: 10,
    paddingRight: 10,
 
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoutImage:{
    width:25,
    height:25,
    marginRight:8,
    tintColor:"orange"
  }
});