import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import SoundPlayer from 'react-native-sound-player';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from './Order';

const PopUpFullScreen = ({ visible, onClose,orderId, setShowNotification,setNewOrders, number }: any) => {
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    if (visible) {
      try {
        SoundPlayer.playAsset(require('../assets/notification.mp3'))
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    }
  }, [visible]);

  const viewOrderDetails = () =>{
    if(number == 1){
      navigation.navigate("View Order Details",{id:orderId});
      setShowNotification((pre:boolean)=>(!pre));
      setTimeout(()=>{
        setNewOrders([])
      },1000)
    }
    else{
      setShowNotification((pre:boolean)=>(!pre));
      setTimeout(()=>{
        setNewOrders([])
      },1000)
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          {/* Circular number indicator */}
          <View style={styles.circleContainer}>
            <Text style={styles.circleNumber}>{number}</Text>
          </View>

          <Text style={styles.modalTitle}>{ number == 1? "New Order Received": "New Orders Received"}</Text>
          <Text style={styles.modalText}>
            {number == 1? "Click below to view details.": "Click below to view orders details"}
          </Text>

          {/* View Details Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              viewOrderDetails();
            }}
          >
            <Text style={styles.buttonText}>{number == 1? "View Order Details" : "View Orders details" }</Text>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopUpFullScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5733',  
  },
  modalView: {
    width: '80%',
    alignItems: 'center',
    padding: 35,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -40,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '300',
  },
  circleContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  circleNumber: {
    fontSize: 28,
    color: '#FF5733',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttonText: {
    color: '#FF5733',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  arrowText: {
    color: '#FF5733',
    fontSize: 20,
    fontWeight: 'bold',
  },
});