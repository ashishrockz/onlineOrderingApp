import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChefgaLogo = () => {
  return (
    <View>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
    </View>
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
