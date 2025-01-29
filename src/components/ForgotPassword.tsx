import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const ForgotPassword = () => {
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => setForgotPasswordModal(true)}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={forgotPasswordModal}
        onRequestClose={() => setForgotPasswordModal(false)} 
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TouchableOpacity style={{alignSelf:"flex-end"}} onPress={() => setForgotPasswordModal(false)}>
      <Image source={{
              uri:"https://png.pngtree.com/png-vector/20190603/ourmid/pngtree-icon-close-button-png-image_1357822.jpg"
            }} style={{height:30,width:30}}></Image>
      </TouchableOpacity>
            <Text style={styles.modalText}>Forgot Password</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="email-address"
                placeholder="Enter your email"
               
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.buttonSend]}>
                <Text style={styles.textStyle}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#0054a5',
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 20,
    width: '100%',
  },
  button: {
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    width: '45%',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#d9534f',
  },
  buttonSend: {
    backgroundColor: '#ff5733',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputGroup: {
    width:'100%'
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
});
