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
  ActivityIndicator,
} from 'react-native';
import { PromotionsData } from '../types/type';
import { ApiUrlConstance, errorMessage, methods } from '../constance/constance';

const Promotions = () => {
  const [inputFilter, setInputFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState([]);
  const [promotionData, setPromotionData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const getPromotionsDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${ApiUrlConstance?.apiUrl}/${ApiUrlConstance?.promotion}`, {
        method: methods?.get,
        headers: {
          Authorization: `${ApiUrlConstance?.bearer} ${token}`,
          outlet: ApiUrlConstance?.firstOutlet,
        },
      });
      if (response.ok) {
        setError('');
        const responseData = await response.json();
        setPromotionData(responseData);
        setFilteredData(responseData);
      } else {
        const responseData = await response.json();
        setError(responseData?.msg || errorMessage?.something_went_wrong);
      }
    } catch (error) {
      setError(errorMessage?.catch_error);
      console.error('Error fetching Promotions details:', error);
    } finally {
      setLoading(false);
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
      <View style={styles.cardHeader}>
        <View style={styles.nameContainer}>
          <Text style={styles.cardName}>{item?.name}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item?.discount_percentage}% OFF</Text>
          </View>
        </View>
        <Text style={styles.codeText}>Code: {item?.discount_code}</Text>
      </View>
      
      <View style={styles.cardDivider} />
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios/50/phone.png' }}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{item?.phone_number}</Text>
          </View>
          <View style={styles.infoItem}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios/50/mail.png' }}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{item?.email}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios/50/calendar.png' }}
            style={styles.infoIcon}
          />
          <Text style={styles.dateText}>
            Registered on: {new Date(item.start_date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );

  const EmptyListMessage = () => (
    <View style={styles.emptyListContainer}>
      <Image
        source={{ uri: 'https://img.icons8.com/ios/100/search.png' }}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.noDataText}>No promotions found</Text>
      <Text style={styles.noDataSubText}>
        Try adjusting your search to find what you're looking for
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios/50/search.png' }}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search promotions..."
              style={styles.input}
              value={inputFilter}
              onChangeText={text => setInputFilter(text)}
              placeholderTextColor="#666"
            />
            {inputFilter.length > 0 && (
              <TouchableOpacity onPress={() => setInputFilter('')} style={styles.clearButton}>
                <Image
                  source={{ uri: 'https://img.icons8.com/ios/50/delete-sign.png' }}
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Total Promotions: {filteredData?.length}
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading promotions...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderCard}
          contentContainerStyle={[
            styles.listContainer,
            filteredData.length === 0 && styles.emptyListContentContainer,
          ]}
          ListEmptyComponent={EmptyListMessage}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Promotions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    width:"60%"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    width: 16,
    height: 16,
    tintColor: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  discountBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 14,
  },
  codeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  cardBody: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 16,
    height: 16,
    tintColor: '#666',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    tintColor: '#666',
    marginBottom: 16,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  noDataSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
  },
  emptyListContentContainer: {
    flexGrow: 1,
  },
});