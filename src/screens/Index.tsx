import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FooterIndex from '../components/FooterIndex';
import Orders from '../components/Order';


const Index = () => {
  return (
    <View style={styles.container}>  
      <Orders />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
