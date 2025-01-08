import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useContext } from 'react';
import ChefgaLogo from './assets/ChefgaLogo';
import { loginToken } from '../hooks/AuthuContext';
 
const Header = () => {

  const {setToken} = useContext(loginToken);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <ChefgaLogo />
        <TouchableOpacity onPress={()=>(setToken(false))}>
          <Image source={require('../assets/logout.png')} style={{marginRight:8}}/>
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
});