import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Button,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {loginToken} from '../hooks/AuthuContext';
import ForgotPassword from '../components/ForgotPassword';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorMessage, ApiUrlConstance, methods, errorMessageConstants} from '../constance/constance';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({email: false, password: false});
  const {setToken} = useContext(loginToken);

  const handelSubmit = async () => {
    try {
      const response = await fetch(
        `${ApiUrlConstance?.apiUrl}/${ApiUrlConstance?.login}`,
        {
          method: methods?.post,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: email, password}),
        },
      );
      if (response.ok) {
        const responceData = await response.json();
        if (responceData?.data?.access_token) {
          await AsyncStorage.setItem(
            'userToken',
            responceData.data.access_token,
          );
          setToken(true);
        } else {
          setError('Invalid response from server');
        }
      } else {
        const responseData = await response.json();
        setErrors({email: false, password: false});
        setErrMsg({email: '', password: ''});
        console.log(responseData.code);
       
        switch (responseData?.code) {
          case errorMessageConstants?.incorrect_password:
            setErrors(prev => ({...prev, password: true}));
            setErrMsg(prev => ({
              ...prev,
              password:
                errorMessage?.incorrect_password || 'Incorrect password',
            }));
            break;
          case errorMessageConstants?.incoorrect_mail:
            setErrors(prev => ({...prev, email: true}));
            setErrMsg(prev => ({
              ...prev,
              email: errorMessage?.incoorrect_mail || 'Incorrect email',
            }));
            break;
          default:
            setError(errorMessage?.something_went_wrong || 'An error occurred');
            break;
        }
      }
    } catch (error) {
      setToken(false);
      setError('Invalid Credentials please try again');
      Alert.alert('Invalid Credentials please try again');
    }
  };
 
 

  const emailValidation = (text: string | null): string => {
    if (!text) {
      return 'Email is required';
    }

    const trimmedText = text.trim();

    if (trimmedText.length === 0) {
      return 'Email is required';
    } else if (text !== trimmedText) {
      return 'Email must not contain leading or trailing spaces';
    } else if (/\s/.test(text)) {
      return 'Email must not contain spaces';
    } else if (text.length > 50) {
      return 'Email length must not be greater than 50';
    } else if (!text.toLowerCase().endsWith('.com')) {
      return 'Please enter a valid email format';
    }
    return '';
  };

  const passwordValidation = (text: string | null): string => {
    if (!text) {
      return 'Password is required';
    }

    const trimmedText = text.trim();

    if (trimmedText.length === 0) {
      return 'Password is required';
    } else if (text !== trimmedText) {
      return 'Password must not contain leading or trailing spaces';
    } else if (/\s/.test(text)) {
      return 'Password must not contain spaces';
    } else if (text.length < 8) {
      return 'Password must be at least 8 characters.';
    }
    return '';
  };

  const validateEmail = (text: string) => {
    const safeText = text || '';
    setEmail(safeText);
    const msg = emailValidation(safeText);
    setErrMsg(prev => ({...prev, email: msg}));
    setErrors(prev => ({...prev, email: !!msg}));
  };

  const validatePassword = (text: string) => {
    const safeText = text || '';
    setPassword(safeText);
    const msg = passwordValidation(safeText);
    setErrMsg(prev => ({...prev, password: msg}));
    setErrors(prev => ({...prev, password: !!msg}));
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.img}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Login</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={[styles.textInput, errors.email && {borderColor: 'red'}]}
                keyboardType="email-address"
                placeholder="Enter your email"
                value={email}
                onChangeText={validateEmail}
              />
              <View style ={{paddingTop:4}}>
              {errors.email && (
                <Text style={styles.errorText}>{errMsg.email}</Text>
              )}
            </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password *</Text>
              <View
                style={[
                  styles.passwordContainer,
                  errors.password && {borderColor: 'red'},
                ]}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!passwordVisible}
                  placeholder="Enter your password"
                  autoCapitalize="none"
                  value={password}
                  onChangeText={validatePassword}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Image
                    style={styles.icon}
                    source={
                      passwordVisible
                        ? require('../assets/Eye.png')
                        : require('../assets/Eyeoff.png')
                    }
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errMsg.password}</Text>
              )}
            </View>
            <ForgotPassword />
            {error && <Text style={[styles.errorText,{textAlign:'center',marginBottom:10}]}>{error}</Text>}
            <TouchableOpacity
              style={[
                styles.loginButton,
                (!email || !password || errors.email || errors.password) &&
                  styles.notActiveLoginButton,
              ]}
              onPress={handelSubmit}
              disabled={!email || !password || errors.email || errors.password}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: '60%', // Adjusted for better scaling
    height: 120,
    resizeMode: 'contain',
  },
  loginContainer: {
    // backgroundColor: '#fff',
    // padding: 20,
    // borderRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 3,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#3b3b3b',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 20,
    fontSize: 18,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    marginRight: 10,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: '#555',
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
  loginButton: {
    backgroundColor: '#ff5733',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  notActiveLoginButton: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    alignItems: 'center',
  },
});
