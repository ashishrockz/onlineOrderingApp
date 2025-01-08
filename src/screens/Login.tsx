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
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import { loginToken } from '../hooks/AuthuContext';
const {width, height} = Dimensions.get('window');
 
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState({email:"",password:""});
  const [errors, setErrors] = useState({email:false,password:false});
  const {setToken} = useContext(loginToken)
  const handelSubmit = async () => {
    try {
      const response = await fetch(`http://10.0.12.113:3000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setToken(true);
        console.log(data);
      } else {
        setToken(false);
        setError('Something went wrong... Please try again');
      }
    } catch (error) {
      setToken(false);
      console.error(error);
      setError('An error occurred. Please try again.');
    }
  };  
 
  const emailValidation = (text: string) => {
    if (!text) {
        return "Email is required";
    } else if (/\s/.test(text)) {
        return "Email must not contain spaces";
    } else if (/^\s|\s$/.test(text)) {
        return "Email must not contain leading or tail spaces";
    }
    else if (text.length > 50) {
        return "Email length must not be greater than 50"
    }
    else if (!text.endsWith(".com")) {
        return "Please enter a valid email format"
    }
    return "";
  };
 
  const passwordValidation = (text: string) => {
    if (!text) {
      return "Email is required";
    }
    else if (text.length < 8) {
        return 'Password must be at least 8 characters.';
    } else if (/\s/.test(text)) {
        return "Password must not contain spaces";
    } else if (/^\s|\s$/.test(text)) {
        return "Password must not contain leading or tail spaces";
    }
    return "";
  };
 
 
  const validateEmail = (text:string) => {
    setEmail(text);
    const msg = emailValidation(text);
    if(msg){
      setErrMsg({ ...errMsg, email: msg });
      setErrors({ ...errors, email: true });
    }
    else{
      setErrMsg({ ...errMsg,email:"" });
      setErrors({ ...errors, email: false });
    }
  };
 
  const validatePassword = (text:string) => {
    setPassword(text);
    const msg = passwordValidation(text);
    if(msg){
      setErrMsg({ ...errMsg, password: msg });
      setErrors({ ...errors, password: true });
    }
    else{
      setErrMsg({ ...errMsg,password:"" });
      setErrors({ ...errors, password: false });
    }
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
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.textInput,errors.email && {borderColor:"red"}]}
                keyboardType="email-address"
                placeholder="Enter your email"
                onChangeText={text => {
                  validateEmail(text);
                }}
              />
              {errors.email && <Text style={{color:"red",fontSize:18}}>{errMsg.email}</Text>}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.passwordContainer, errors.password && {borderColor:"red"}]}>
                <TextInput
                  style={styles.passwordInput }
                  secureTextEntry={!passwordVisible}
                  placeholder="Enter your password"
                  autoCapitalize="none"
                  onChangeText={text => {
                    validatePassword(text);
                  }}
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
              {errors.password && <Text style={{color:"red",fontSize:18}}>{errMsg.password}</Text>}
            </View>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.loginButton,
                (!email || !password || errors.email || errors.password) && styles.notActiveLoginButton,
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
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
    backgroundColor: '#0054a5',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  notActiveLoginButton:{
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
});