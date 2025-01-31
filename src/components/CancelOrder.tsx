import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

interface CancelOrderProps {
  visible: boolean;
  onClose: () => void;
  orderId: string;
  onCancel?: () => void;
}

const CancelOrder: React.FC<CancelOrderProps> = ({
  visible,
  onClose,
  orderId,
  onCancel,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Order ID: {orderId}</Text>
            {/* <TouchableOpacity onPress={onClose}>
            <Image
              source={{
                uri: 'https://img.icons8.com/ios/50/delete-sign.png',
              }}
              style={{height: 20, width: 20}}
            />
            </TouchableOpacity> */}
          </View>

          <Text style={styles.modalText}>
            Are you sure you want to cancel this order?
          </Text>

          <View style={styles.warningContainer}>
            <Image
              source={require('../assets/exclamation.png')}
              style={styles.warningIcon}
            />
            <Text style={styles.warningText}>
              Cancelling this order will initiate refund process!
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancelOrderButton]}>
              <Text style={styles.cancelOrderButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  closeIcon: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FEF3F2',
    padding: 10,
    borderRadius: 4,
  },
  warningIcon: {
    marginRight: 8,
    width: 25,
    height: 25,
  },
  warningText: {
    color: '#E11D48',
    flex: 1,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: '#fff',
  },
  cancelOrderButton: {
    backgroundColor: '#E11D48',
    marginLeft: 15,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CancelOrder;
