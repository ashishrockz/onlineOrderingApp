import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import React, { useRef, useEffect, useCallback } from 'react';

const PopUpBottomSheet = ({ visible, onClose, title, message, number = "1" }:any) => {
  const sheetRef = useRef<BottomSheetMethods>(null);
  
  const handleSheetClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        sheetRef.current?.open();
      }, 100);
    }
  }, [visible]);

  return (
    <BottomSheet 
      ref={sheetRef} 
      height={500} 
      style={styles.bottomSheet}
      closeOnBackdropPress={false}
      enableDragDown={false}
      enablePanDownToClose={false}
      enableOverDrag={false}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
    >
      <View style={styles.contentContainer}>
        <View style={styles.circleContainer}>
          <Text style={styles.circleNumber}>{number}</Text>
        </View>

        <Text style={styles.modalTitle}>{title || "New Order Received"}</Text>
        <Text style={styles.modalText}>
          {message || "Click below to view details."}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSheetClose}
        >
          <Text style={styles.buttonText}>View Order Details</Text>
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 10,
  },
  closeButtonText: {
    color: '#FF5733',
    fontSize: 24,
    fontWeight: '300',
  },
  circleContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  circleNumber: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#FF5733',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF5733',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  arrowText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default PopUpBottomSheet;