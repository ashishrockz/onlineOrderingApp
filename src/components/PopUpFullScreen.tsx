import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import SoundPlayer from 'react-native-sound-player';

const PopUpFullScreen = ({ visible, onClose, title, message, number = "1" }: any) => {
  useEffect(() => {
    if (visible) {
      try {
        SoundPlayer.playAsset(require('../assets/notification.mp3'))
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    }
  }, [visible]);

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

          <Text style={styles.modalTitle}>{title || "New Order Received"}</Text>
          <Text style={styles.modalText}>
            {message || "Click below to view details."}
          </Text>

          {/* View Details Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>View Order Details</Text>
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