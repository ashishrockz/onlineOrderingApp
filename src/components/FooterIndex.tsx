import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const { height } = Dimensions.get('window'); // Get screen height

const FooterIndex = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:16,textAlign:'center'}}>Copyright © 2025, Powered by Chefgaa. All rights reserved</Text>
    </View>
  )
}

export default FooterIndex

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        bottom: 0,
        width: '100%', 
        borderTopWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff', 
        height: height * 0.08, 
    
    }
})