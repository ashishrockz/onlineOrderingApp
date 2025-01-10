import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import FooterIndex from '../components/FooterIndex';
import Orders from '../components/Order';
import Header from '../components/Header';
import Promotions from '../components/Promotions';
 
const Index = () => {
  const [currentComponent, setCurrentComponent] = useState("orders");
 
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setCurrentComponent("orders")} style={[styles.button,currentComponent === "orders" && styles.activeButton,]}>
          <Text style={[styles.buttonText,currentComponent === "orders" && styles.activeButtonText,]}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentComponent("promotions")} style={[styles.button,currentComponent === "promotions" && styles.activeButton,]}>
          <Text style={[styles.buttonText,currentComponent === "promotions" && styles.activeButtonText,]}>
            Promotions
          </Text>
        </TouchableOpacity>
      </View>
      {currentComponent == "orders" ?<Orders />:<Promotions/>}
    </SafeAreaView>
  );
};
 
export default Index;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
    borderBottomWidth:1,
    borderColor:'#ddd'
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  activeButton: {
    borderColor: 'orange',
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  activeButtonText: {
    color: 'orange',
  },
});