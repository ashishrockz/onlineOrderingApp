import {MenuView} from '@react-native-menu/menu';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {orderType} from '../types/type';
import {
  STATUS_MAP,
  statusContainerStyles,
  statusOptions,
  statusStyles,
  ApiUrlConstance,
  errorMessage,
  methods,
  statusmode,
} from '../constance/constance';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {twelveHoursFormat, formatDate} from '../hooks/helpers';

type RootStackParamList = {
  RecentOrdersOfUsers: {name: string};
  viewOrder: {id: number};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecentOrdersOfUsers'>;

const Orders = () => {
  const navigation = useNavigation<NavigationProp>();
  const [inputFilter, setInputFilter] = useState<string>('');
  const [orderList, setOrderList] = useState<orderType[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<orderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>(statusmode?.all);

  const getOrderDetails = async () => {
    try {
      const response = await fetch(
        `${ApiUrlConstance?.chefgaApiUrl}/${ApiUrlConstance?.order}`,
        {
          method: methods?.get,
          headers: {
            Authorization: `${ApiUrlConstance?.bearer} eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MX0sImlhdCI6MTczODEyNTg4Mn0.CPD_pjsl__yHgZBNNAoEG6xMhQyb6cSZ41LQHyLH9s8`,
            outlet: ApiUrlConstance?.secondOutlet,
          },
        },
      );
      if (response?.ok) {
        const responseData = await response.json();
        return responseData?.data;
      } else {
        const responseData = await response.json();
        setError(responseData?.msg || errorMessage?.something_went_wrong);
      }
    } catch (error) {
      setError(errorMessage?.catch_error);
      console.error('Error fetching order details:', error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    const fetchedData = await getOrderDetails();
    if (fetchedData) {
      setOrderList(fetchedData);
      setFilteredOrders(fetchedData);
    }
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedData = await getOrderDetails();
      if (fetchedData) {
        setOrderList(fetchedData);
        setFilteredOrders(fetchedData);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredByGlobal = orderList?.filter(orderObj =>
        orderObj?.Name?.toLowerCase().includes(inputFilter.trim().toLowerCase()),
      );
      const finalFiltered = statusFilter !== statusmode?.all
        ? filteredByGlobal?.filter(orderObj => orderObj?.status.toString() === statusFilter)
        : filteredByGlobal;
      setFilteredOrders(finalFiltered);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputFilter, statusFilter, orderList]);

  const OrderCard = ({order}: {order: orderType}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>#{order.id}</Text>
          <View style={[statusContainerStyles[order.status], styles.statusBadge]}>
            <Text style={statusStyles[order.status]}>
              {STATUS_MAP?.[order.status]?.label}
            </Text>
          </View>
        </View>
        <MenuView
          onPressAction={({nativeEvent}) => {
            if (nativeEvent.event === 'View Order') {
              navigation.navigate("viewOrder", {id: order.id});
            } else if (nativeEvent.event === 'Recent orders') {
              navigation.navigate('RecentOrdersOfUsers', {name: order.Name});
            }
          }}
          actions={[
            {id: 'View Order', title: 'View Order', titleColor: '#007AFF'},
            {id: 'Recent orders', title: 'Recent Orders', titleColor: '#007AFF'},
          ]}
          shouldOpenOnLongPress={false}>
          <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/7066/7066144.png'}}
            style={styles.menuIcon}
          />
        </MenuView>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{order.Name}</Text>
          <Text style={styles.emailText}>{order.email}</Text>
          <Text style={styles.mobilenoText}>{order.mobile_no}</Text>

        </View>
        
        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fulfillment:</Text>
            <Text style={styles.detailValue}>
              {formatDate(order.date)} at {twelveHoursFormat(order.time)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>{order.type}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount:</Text>
            <Text style={styles.amount}>${order.Amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Image
              source={{uri: 'https://img.icons8.com/ios7/600/search.png'}}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search by name..."
              placeholderTextColor="#666"
              style={styles.searchInput}
              value={inputFilter}
              onChangeText={setInputFilter}
            />
            {inputFilter.length > 0 && (
              <TouchableOpacity onPress={() => setInputFilter('')}>
                <Image
                  source={{uri: 'https://static-00.iconduck.com/assets.00/cross-mark-emoji-256x256-5xa7ff4l.png'}}
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Status</Text>
            <Dropdown
              style={styles.dropdown}
              data={statusOptions}
              maxHeight={180}
              labelField="label"
              valueField="value"
              placeholder="All"
              value={statusFilter}
              onChange={item => setStatusFilter(item.value)}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
            />
          </View>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {filteredOrders?.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No orders found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12,
    flex: 1, 
  },
  searchInputContainer: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    marginLeft: 8,
  },
  filterContainer: {
    gap: 8,
    width: '35%', // Added to give appropriate width to filter section
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
  clearIcon: {
    width: 12,
    height: 12,
    tintColor: '#666',
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  dropdown: {
    flex: 1, 
    height: 40,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 0,
  },
  dropdownPlaceholder: {
    fontSize: 18,
    color: '#666',
  },
  dropdownSelectedText: {
    fontSize: 18,
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderId: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  cardContent: {
    padding: 16,
    gap:16
  },
  customerInfo: {
    gap: 4,
  },
  customerName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  emailText: {
    fontSize: 15,
    color: '#666',
  },
  mobilenoText: {
    fontSize: 15,
    color: '#666',
  },
  orderDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
  },
  detailValue: {
    fontSize: 15,
    color: '#000',
  },
  amount: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3b3b3b',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F2F2F7',
  },
  errorText: {
    fontSize: 17,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Orders;