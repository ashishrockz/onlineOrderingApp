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
  Alert,
  Modal,
  Button,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {orderType} from '../types/type';
import {
  STATUS_MAP,
  statusContainerStyles,
  statusOptions,
  statusStyles,
} from '../components/constance/constance';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
type RootStackParamList = {
  RecentOrdersOfUsers: {name: string};
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RecentOrdersOfUsers'
>;

export default function Orders() {
  const navigation = useNavigation<NavigationProp>();
  const [inputFilter, setInputFilter] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<orderType[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<orderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalVisible, setModalVisible] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState<any[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const getOrderDetails = async () => {
    try {
      const token = AsyncStorage.getItem('userToken');
      const response = await fetch('https://api.chefgaa.com/order', {
      // const response = await fetch('http://10.0.12.113:3000/order', {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MX0sImlhdCI6MTczNzk1MTMxOX0.0pm34c0uDD11sjBtS8JYOcSoN4GC68TciX3GEqWTp8o
`,
          outlet: '70',
        },
      });
      if (response.ok) {
        setError('');
        const data = await response.json();
        console.log(data);
        
        return data.data;
      } else {
        setError('Something went wrong... Please try again');
      }
    } catch (error) {
      setError('Something went wrong... Please try again');
      console.error('Error fetching order details:', error);
    }
  };

  const formatTimeToAMorPM = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const meridian = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${meridian}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Invalid Date';
    const [year, month, day] = dateString?.split('-');
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedData = await getOrderDetails();
      if (fetchedData) {
        setOrderDetails(fetchedData);
        setFilteredOrders(fetchedData);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      const filteredByGlobal = orderDetails.filter(orderObj =>
        orderObj.Name.toLowerCase().includes(inputFilter.trim().toLowerCase()),
      );
      if (statusFilter !== 'all') {
        const filteredByStatus = filteredByGlobal.filter(
          orderObj => orderObj.status.toString() === statusFilter,
        );
        setFilteredOrders(filteredByStatus);
      } else {
        setFilteredOrders(filteredByGlobal);
      }
      setIsFiltering(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputFilter, statusFilter, orderDetails]);

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorMsgText}>{error}</Text>
      </SafeAreaView>
    );
  }

  async function getOrderIdDetails(id: number) {
    setModalVisible(!isModalVisible);
    try {
      const url = `https://api.chefgaa.com/order/${id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MX0sImlhdCI6MTczNjM5ODk4MH0.P1qE4Gvw1ch7HyNqhLtQP_TtC--DxGSS3gI3WwJ5j5A',
          outlet: '70',
        },
      });
      if (response.ok) {
        setError('');
        const data = await response.json();
        setViewOrderDetails(data.data);
      } else {
        setError('Something went wrong... Please try again');
      }
    } catch (error) {
      setError('Something went wrong... Please try again');
      console.error('Error fetching order details:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
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
        <View style={styles.filtersBlock}>
          <Text style={styles.filtersText}>Filter by status</Text>
          <Dropdown
            style={styles.dropdown}
            data={statusOptions}
            maxHeight={180}
            labelField="label"
            valueField="value"
            placeholder="Select status"
            value={statusFilter}
            onChange={item => setStatusFilter(item.value)}
            iconStyle={{marginRight: 10}}
          />
        </View>
      </View>
      {isLoading || isFiltering ? (
        <ActivityIndicator size={40} style={styles.loading}></ActivityIndicator>
      ) : (
        <ScrollView style={styles.cardWrapper}>
          {filteredOrders?.length ? (
            filteredOrders.map((obj: orderType, index) => (
              <View key={index} style={styles.card}>
                <MenuView
                  onPressAction={({nativeEvent}) => {
                    const selectedId = nativeEvent.event;
                    if (selectedId === 'View Order') {
                      console.log('view order');
                      getOrderIdDetails(obj.id);
                    } else if (selectedId === 'Recent orders') {
                      console.log('recent order');
                      navigation.navigate('RecentOrdersOfUsers', {
                        name: obj.Name,
                      });
                    }
                  }}
                  actions={[
                    {
                      id: 'View Order',
                      title: 'View Order',
                      titleColor: 'Black',
                    },
                    {
                      id: 'Recent orders',
                      title: 'Recent Orders',
                      titleColor: 'Black',
                    },
                  ]}
                  shouldOpenOnLongPress={false}
                  style={{alignSelf: 'flex-end'}}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/7066/7066144.png',
                    }}
                    style={styles.menuIcon}
                  />
                </MenuView>
                <View style={styles.valuePairs}>
                  <Text style={styles.label}>Order ID</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.cardText}>{obj.id}</Text>
                </View>
                <View style={styles.valuePairs}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.cardText}>{obj.Name}</Text>
                </View>
                <View style={styles.valuePairs}>
                  <Text style={styles.label}>To Be Fulfilled On</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.cardText}>
                    {formatDate(obj.date)} at {formatTimeToAMorPM(obj.time)}
                  </Text>
                </View>
                <View style={styles.valuePairs}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.cardText}>{obj.email}</Text>
                </View>
                <View style={styles.valuePairs}>
                  <Text style={styles.label}>Order Type</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.cardText}>{obj.type}</Text>
                </View>
                <View style={styles.valuePairs}>
                  <Text style={styles.label}>Amount</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.cardText}>${obj.Amount}</Text>
                </View>
                <View style={styles.valuePairs}>
                  <Text style={styles.label}>Status</Text>
                  <Text style={styles.colon}>:</Text>
                  <View style={statusContainerStyles[obj.status]}>
                    <Text style={statusStyles[obj.status]}>
                      {STATUS_MAP[obj.status]?.label}
                    </Text>
                  </View>
                </View>
                {/* <TouchableOpacity onPress={() => {
                                getOrderIdDetails(obj.id);
                            }} style={{ alignSelf: "center", backgroundColor: "#234afa", padding: 8, borderRadius: 8 }}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>View Order</Text>
                            </TouchableOpacity> */}
              </View>
            ))
          ) : (
            <Text style={styles.noOrdersText}>No orders found</Text>
          )}
        </ScrollView>
      )}
      <View>
        {isModalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setModalVisible(!isModalVisible);
              setViewOrderDetails([]);
            }}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Order Details #{viewOrderDetails[0]?.id}
                </Text>
                <View style={styles.separator}></View>

                <ScrollView style={styles.scrollContent}>
                  <Text style={styles.sectionTitle}>Customer Information</Text>
                  <View style={styles.customerInfoRow}>
                    <Text style={styles.customerLabel}>Name:</Text>
                    <Text style={styles.value}>
                      {' '}
                      {viewOrderDetails[0]?.customer_details.name}
                    </Text>
                  </View>
                  <View style={styles.customerInfoRow}>
                    <Text style={styles.customerLabel}>Email:</Text>
                    <Text style={styles.value}>
                      {' '}
                      {viewOrderDetails[0]?.customer_details.email}
                    </Text>
                  </View>
                  <View style={styles.customerInfoRow}>
                    <Text style={styles.customerLabel}>Phone:</Text>
                    <Text style={styles.value}>
                      {' '}
                      {viewOrderDetails[0]?.customer_details.mobile_no}
                    </Text>
                  </View>

                  <Text
                    style={[styles.sectionTitle, styles.sectionTitleUpdated]}>
                    Order Items
                  </Text>
                  {viewOrderDetails[0]?.CartItems.map(
                    (cartItems: any, index: number) => (
                      <View key={index} style={styles.orderItemRow}>
                        <Text style={styles.orderItemName}>
                          {cartItems.display_name} X{' '}
                          {Number(cartItems.quantity)}
                        </Text>
                        <Text style={styles.orderItemPrice}>
                          ${cartItems.price}
                        </Text>
                      </View>
                    ),
                  )}

                  <View style={[styles.separator, styles.separator1]}></View>
                  <Text style={styles.sectionTitle}>Order Summary</Text>
                  <View style={styles.summaryRow}>
                    <Text style={styles.label}>Subtotal:</Text>
                    <Text style={styles.value}>
                      ${viewOrderDetails[0]?.sub_total}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.label}>Tax:</Text>
                    <Text style={styles.value}>
                      ${viewOrderDetails[0]?.tax}
                    </Text>
                  </View>
                  {viewOrderDetails[0]?.delivery_fee && (
                    <View style={styles.summaryRow}>
                      <Text style={styles.label}>Delivery Fee:</Text>
                      <Text style={styles.value}>
                        ${viewOrderDetails[0]?.delivery_fee}
                      </Text>
                    </View>
                  )}
                  <View style={styles.summaryRow}>
                    <Text style={styles.total}>Total:</Text>
                    <Text style={styles.totalValue}>
                      ${viewOrderDetails[0]?.total}
                    </Text>
                  </View>

                  <Text
                    style={[styles.sectionTitle, styles.sectionTitleUpdated]}>
                    Additional Details
                  </Text>
                  <View style={styles.infoRow}>
                    <Text style={styles.label1}>Order Type:</Text>
                    <Text style={styles.value}>
                      {' '}
                      {viewOrderDetails[0]?.OrderTypeDefinition.Type}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label1}>Schedule Date:</Text>
                    <Text style={styles.value}>
                      {' '}
                      {new Date(
                        viewOrderDetails[0]?.created_at * 1000,
                      ).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label1}>Schedule Time:</Text>
                    <Text style={styles.value}>
                      {' '}
                      {formatTimeToAMorPM(
                        new Date(
                          viewOrderDetails[0]?.created_at * 1000,
                        ).toLocaleTimeString(),
                      )}
                    </Text>
                  </View>
                </ScrollView>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!isModalVisible);
                    setViewOrderDetails([]);
                  }}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
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
  },
  total: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    width: 140,
    marginTop: 5,
  },
  totalValue: {
    color: 'black',
    textAlign: 'right',
    fontSize: 17,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  separator: {
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  separator1: {
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  scrollContent: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  sectionTitleUpdated: {
    marginTop: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  value: {
    color: 'black',
    textAlign: 'right',
    fontSize: 16,
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderItemName: {
    width: '80%',
    color: 'black',
    fontSize: 16,
  },
  orderItemPrice: {
    color: 'black',
    fontSize: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#234afa',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menu: {
    alignSelf: 'flex-end',
  },
  noOrdersText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 200,
    fontWeight: '600',
  },
  dropdown: {
    borderWidth: 1,
    height: 45,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  errorMsgText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 28,
  },
  loading: {
    marginTop: 250,
  },
  colon: {
    marginRight: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
    padding: 10,
    backgroundColor: '#fcf6e8',
  },
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    padding: 10,
    backgroundColor: '#e6e6e6',
  },
  inputText: {
    borderWidth: 1,
    height: 45,
    borderRadius: 10,
    fontSize: 17,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    width: '60%',
  },
  cardWrapper: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  valuePairs: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    width: 140,
  },
  label1: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  customerLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  cardText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  success: {
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 2,
    width: 100,
    fontSize: 16,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 10,
  },
  searchHeader: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'center',
  },
  searchCancelImg: {marginLeft: 18, height: 14, width: 14},
  searchIconImg: {height: 25, width: 25},
  filtersBlock: {
    flexDirection: 'column',
    width: '34%',
    marginLeft: 10,
    alignItems: 'center',
  },
  filtersText: {
    fontWeight: '500',
    fontSize: 15,
  },
  menuIcon: {height: 20, width: 20, alignSelf: 'flex-end'},
});
