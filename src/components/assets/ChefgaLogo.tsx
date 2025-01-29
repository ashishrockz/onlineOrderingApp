import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';

const ChefgaLogo = ({onPress}:any) => {
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
    </TouchableOpacity>
  );
};

export default ChefgaLogo;

const styles = StyleSheet.create({
  logo: {
    width: 125,
    height: 100,
    resizeMode: 'contain',
  },

});
