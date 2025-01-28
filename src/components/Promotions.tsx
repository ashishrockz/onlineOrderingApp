import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
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
import { PromotionsData } from '../types/type';
import { ApiUrlConstance, errorMessage, methods } from '../constance/constance';
 
 
const Promotions = () => {
  const [inputFilter, setInputFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState([]);
  const [promotionData, setPromotionData] = useState([]);
  const [error, setError] = useState('');
 
   const getPromotionsDetails = async () => {
    try {
      const token =  await AsyncStorage.getItem('userToken');
      const response = await fetch(`${ApiUrlConstance?.apiUrl}/${ApiUrlConstance?.promotion}`, {
        method: methods?.get,
        headers: {
          Authorization: `${ApiUrlConstance?.bearer} ${token}`,
          outlet: ApiUrlConstance?.firstOutlet,
        },
      });
      if (response.ok) {
        setError('');
        const responceData = await response.json();
        setPromotionData(responceData);
        setFilteredData(responceData);
        // console.log(data);
        
        return responceData?.data;
      } else {
        const responseData = await response.json();
        switch (responseData?.msg) {
          case errorMessage?.unauthorized_access:
            setError(errorMessage?.unauthorized_access);
            break;
          case errorMessage?.promotion_details_not_found:
            setError(errorMessage?.promotion_details_not_found);
            break;
          case errorMessage?.something_went_wrong:
            setError(errorMessage?.something_went_wrong);
            break;
          default:
            setError(errorMessage?.something_went_wrong);
            break;
        }
      }
    } catch (error) {
      setError(errorMessage?.catch_error);
      console.error('Error fetching Promotions details:', error);
    }
  };    
 
  useEffect(() => {
    getPromotionsDetails();
  }, []);
 
  useEffect(() => {
    const filteredDataOfUser = promotionData.filter((user: PromotionsData) => {
      const searchString = inputFilter.toLowerCase();
      return (
        user?.name.toLowerCase().includes(searchString) ||
        user?.phone_number.toLowerCase().includes(searchString) ||
        user?.email.toLowerCase().includes(searchString) ||
        user?.discount_code.toLowerCase().includes(searchString)
      );
    });
    setFilteredData(filteredDataOfUser);
  }, [inputFilter, promotionData]);

  const renderCard = ({ item }: { item: PromotionsData }) => (
    <View style={styles.card}>
      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardHeading}>Name:</Text>
        <Text style={styles.cardDetail}>{item?.name}</Text>
      </View>
      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardHeading}>Phone:</Text>
        <Text style={styles.cardDetail}>{item?.phone_number}</Text>
      </View>
      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardHeading}>Email:</Text>
        <Text style={styles.cardDetail}>{item?.email}</Text>
      </View>
      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardHeading}>Code:</Text>
        <Text style={styles.cardDetail}>{item?.discount_code}</Text>
      </View>
      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardHeading}>Discount:</Text>
        <Text style={styles.cardDetail}>{item?.discount_percentage}%</Text>
      </View>
      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardHeading}>Registered On:</Text>
        <Text style={styles.cardDetail}>
          {new Date(item.start_date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  const EmptyListMessage = () => (
    <View style={styles.emptyListContainer}>
      <Text style={styles.noDataText}>No users found</Text>
      <Text style={styles.noDataSubText}>
        Try adjusting your search to find what you're looking for
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1', margin: 10 }}>
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
          Total Registrations: {promotionData?.length}
        </Text>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderCard}
        contentContainerStyle={[
          styles.cardContainer,
          filteredData.length === 0 && styles.emptyListContentContainer,
        ]}
        ListEmptyComponent={EmptyListMessage}
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
    fontSize: 15,
    color: '#333',
    marginBottom: 3,
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cardHeading: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize:16
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyListContentContainer: {
    flexGrow: 1,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  noDataSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
 
});
 