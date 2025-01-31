import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ApiUrlConstance, methods} from '../constance/constance';
import { orderType } from '../types/type';

interface CompleteOrderProps {
    visible: boolean;
    onClose: () => void;
    orderId: string;
    setOrderList: (orders: orderType[]) => void;  
    getOrderDetails: () => Promise<orderType[]>; 
    setCompleteModel:(a:boolean) =>void; 
  }

const CompleteOrder: React.FC<CompleteOrderProps> = ({
  visible,
  onClose,
  orderId,
  setOrderList,
  getOrderDetails,
  setCompleteModel,
}) => {
  const onComplete = async () => {
    try {
      const response = await fetch(
        `${ApiUrlConstance?.apiUrl}/${ApiUrlConstance?.order}/${orderId}/${ApiUrlConstance?.complete}`,
        {
          method: methods?.get,
          headers: {
            Authorization: `${ApiUrlConstance?.bearer} eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MX0sImlhdCI6MTczODMwODI1NH0.MBkDmIVd5M6fwMNF-A2ouEx9wNfJ-BRowzQjnMtat88`,
            outlet: ApiUrlConstance?.firstOutlet,
          },
        },
      );
      console.log(1);
      
      if(response?.ok){
        const responseData = await getOrderDetails()
        setOrderList(responseData)
        setCompleteModel(false)
        console.log(2);
        
      }
    } catch {}
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              source={{
                uri: 'https://img.icons8.com/ios/50/delete-sign.png',
              }}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity> */}

          <Text style={styles.modalTitle}>Order ID: {orderId}</Text>

          <Text style={styles.modalText}>
            Are you sure you want to mark this order as complete?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.completeButton]}
              onPress={()=>onComplete()}>
              <Text style={styles.completeButtonText}>Complete Order</Text>
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
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
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
  completeButton: {
    backgroundColor: '#00C853',
    marginLeft: 15,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CompleteOrder;
