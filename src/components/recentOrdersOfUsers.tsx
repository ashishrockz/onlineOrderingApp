import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  orderOptions,
  statusContainerStylesForRecentOrders,
  statusOptions,
  statusStylesForRecentOrders,
} from './constance/constance';

export default function RecentOrdersOfUsers({route}: any) {
  const [allOrders, setAllOrders] = useState([]);
  const [inputFilter, setInputFilter] = useState<string>('');
  const [orders, setOrders] = useState([]);
  const [dummyData, setDummyData] = useState({});
  const [statusFilter, setStatusFilter] = useState('id');
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const getAllOrders = async () => {
    const response = await fetch('http://10.0.2.2:8000/dummyData');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  };

  useEffect(() => {
    async function getOrders() {
      setIsLoading(true);
      const data = await getAllOrders();
      setDummyData(data);
      setAllOrders(data.orders);
      setOrders(data.orders);
      setIsLoading(false);
    }
    getOrders();
  }, []);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      if (statusFilter == 'id') {
        const data = allOrders.filter((obj: any) =>
          obj.order_id.toString().includes(inputFilter),
        );
        setOrders(data);
      } else if (statusFilter == 'status') {
        const data = allOrders.filter((obj: any) =>
          obj.status.toLowerCase().includes(inputFilter.toLowerCase()),
        );
        setOrders(data);
      } else if (statusFilter == 'mode') {
        const data = allOrders.filter((obj: any) =>
          obj.delivery_mode.toLowerCase().includes(inputFilter.toLowerCase()),
        );
        setOrders(data);
      }
      setIsFiltering(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [inputFilter, statusFilter, allOrders]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        Recent Orders by {route.params.name}
      </Text>
      <View style={styles.topBar}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={`Search by ${statusFilter}...`}
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
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://img.icons8.com/ios7/600/search.png',
                }}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <Dropdown
          style={styles.dropdown}
          data={orderOptions}
          maxHeight={180}
          labelField="label"
          valueField="value"
          placeholder="Select status"
          value={statusFilter}
          onChange={item => setStatusFilter(item.value)}
          iconStyle={styles.dropdownIcon}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading || isFiltering ? (
          <ActivityIndicator size={40} style={styles.loading} />
        ) : orders.length > 0 ? (
          orders.map((orderObj: any) => (
            <View style={styles.orderCard} key={orderObj.order_id}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order ID # {orderObj.order_id}</Text>
                <View
                  style={statusContainerStylesForRecentOrders[orderObj.status]}>
                  <Text style={statusStylesForRecentOrders[orderObj.status]}>
                    {orderObj.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.deliveryMode}>{orderObj.delivery_mode}</Text>
              <Text style={styles.orderDate}>{orderObj.order_date_time}</Text>
              <View style={styles.separator} />
              {orderObj.dishes.map((dish: any) => (
                <View style={styles.dishRow} key={dish.dish_name}>
                  {dish.itemType === 'Vegetarian' ? (
                    <Image
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/2048px-Veg_symbol.svg.png',
                      }}
                      style={styles.icon}
                    />
                  ) : (
                    <Image
                      source={require('../assets/image.png')}
                      style={styles.nonVegIcon}
                    />
                  )}
                  <Text style={styles.dishText}>
                    {dish.quantity} x {dish.dish_name}
                  </Text>
                </View>
              ))}
              <View style={styles.dottedSeparator} />
              <View style={styles.orderFooter}>
                <Text style={styles.amountPaid}>Total</Text>
                <Text style={styles.amountPaid}>
                  ${orderObj.amount_paid.toFixed(2)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noOrdersText}>No orders found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  noOrdersText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 200,
    fontWeight: '600',
  },
  loading: {
    marginTop: 250,
  },
  dropdown: {
    borderWidth: 1,
    height: 45,
    paddingLeft: 10,
    width: '32%',
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    marginLeft: 8,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 45,
    marginLeft: 8,
  },
  inputBox: {
    width: '80%',
    fontSize: 17,
    color: 'black',
  },
  clearIcon: {
    marginLeft: 18,
    height: 14,
    width: 14,
  },
  searchIcon: {
    height: 25,
    width: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 15,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '99%',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    color: 'black',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  dishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  nonVegIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  dishText: {
    fontSize: 16,
    color: 'black',
  },
  dottedSeparator: {
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderBottomColor: '#aaa',
    marginVertical: 10,
  },
  orderDate: {
    fontSize: 14,
    color: 'black',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryMode: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  amountPaid: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
});
