import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';

const userData = [
  {
    name: 'Aanya Sharma',
    phone: '(912) 345-6789',
    email: 'Aanyasharma@yopmail.com',
    code: 'TMWM431',
    discount: '5.00',
    registeredOn: 'undefined NaNth 12:NaNam',
    redeemStatus: 'No',
  },
  {
    name: 'Aarav Singh',
    phone: '(987) 654-3210',
    email: 'Aaravsingh@yopmail.com',
    code: 'TMWM862',
    discount: '10.00',
    registeredOn: 'undefined NaNth 12:NaNam',
    redeemStatus: 'No',
  },
];

const Promotions = () => {
  const [inputFilter, setInputFilter] = useState<string>('');
  const [error, setError] = useState('');
  const getPromotionsDetails = async () => {
    try {
      const token = AsyncStorage.getItem('userToken');
      const response = await fetch('http://10.0.12.113:3000/promotion/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          outlet: '69',
        },
      });
      if (response.ok) {
        setError('');
        const data = await response.json();
        return data.data;
      } else {
        setError('Something went wrong... Please try again');
      }
    } catch (error) {
      setError('Something went wrong... Please try again');
      console.error('Error fetching Promotions details:', error);
    }
  };
  useEffect( () =>{
    getPromotionsDetails()
  })
  const filteredData = userData.filter(user =>
    user.name.toLowerCase().includes(inputFilter.toLowerCase()),
  );

  const renderCard = ({item}: {item: any}) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDetail}>Phone: {item.phone}</Text>
      <Text style={styles.cardDetail}>Email: {item.email}</Text>
      <Text style={styles.cardDetail}>Code: {item.code}</Text>
      <Text style={styles.cardDetail}>Discount: {item.discount}%</Text>
      <Text style={styles.cardDetail}>Registered On: {item.registeredOn}</Text>
      <Text style={styles.cardDetail}>Redeem Status: {item.redeemStatus}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f1f1f1', margin: 10}}>
      <View style={styles.SearchHeader}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search by name..."
            style={styles.inputBox}
            value={inputFilter}
            onChangeText={text => setInputFilter(text)}
          />
          {inputFilter.length > 0 ? (
            <TouchableOpacity onPress={() => setInputFilter('')}>
              <Image
                source={{
                  uri: 'https://static-00.iconduck.com/assets.00/cross-mark-emoji-256x256-5xa7ff4l.png',
                }}
                style={styles.searchCancelImg}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://img.icons8.com/ios7/600/search.png',
                }}
                style={styles.searchIconImg}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.registrationText}>
          Total Registrations: {userData.length}
        </Text>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderCard}
        contentContainerStyle={styles.cardContainer}
      />
    </SafeAreaView>
  );
};

export default Promotions;

const styles = StyleSheet.create({
  SearchHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 45,
    marginLeft: 8,
    marginTop: 5,
  },
  inputBox: {
    width: '80%',
    fontSize: 17,
    color: 'black',
    paddingLeft: 10,
  },
  searchCancelImg: {
    marginLeft: 18,
    height: 14,
    width: 14,
  },
  searchIconImg: {
    height: 25,
    width: 25,
  },
  registrationText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDetail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
});
