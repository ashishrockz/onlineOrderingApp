import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ApiUrlConstance,
  errorMessage,
  methods,
  STATUS_MAP,
  statusContainerStyles,
  statusStyles,
} from '../constance/constance';
import {useEffect, useState} from 'react';
import {twelveHoursFormat} from '../hooks/helpers';

export default function OrderDetails({route}: any) {
  const [viewOrderDetails, setViewOrderDetails] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getOrderIdDetails = async (id: number) => {
    try {
      const url = `${ApiUrlConstance?.chefgaApiUrl}/${ApiUrlConstance?.order}/${id}`;
      const response = await fetch(url, {
        method: methods?.get,
        headers: {
          Authorization: `${ApiUrlConstance?.bearer} eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MX0sImlhdCI6MTczODE0NDQ1OH0.x4QjysICjH7u4oMsyFfq0qGZNkcvZfwx-CRyhm2cpEQ`,
          outlet: ApiUrlConstance?.secondOutlet,
        },
      });
      if (response.ok) {
        setError(null);
        const responseData = await response.json();
        setViewOrderDetails(responseData?.data);
      } else {
        const responseData = await response.json();
        setError(responseData?.msg || errorMessage?.something_went_wrong);
      }
    } catch (error) {
      setError(errorMessage?.catch_error);
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    getOrderIdDetails(route.params.id);
  }, [route]);

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorMsgText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => getOrderIdDetails(route.params.id)}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const orderData = viewOrderDetails[0];
  {
    orderData?.CartItems.map((item: any, index: number) => {
      console.log(item.quantity);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.orderId}>Order #{orderData?.id}</Text>
          <View
            style={[
              statusContainerStyles[orderData?.status],
              styles.orderStatusBadge,
            ]}>
            <Text style={statusStyles[orderData?.status]}>
              {STATUS_MAP?.[orderData?.status]?.label}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.card}>
            {orderData?.CartItems.map((item: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.orderItem,
                  index !== orderData.CartItems.length - 1 &&
                    styles.orderItemBorder,
                ]}>
                <View style={styles.orderItemHeader}>
                  <Text style={styles.orderItemName}>{item.display_name}</Text>
                  <Text style={styles.orderItemPrice}>${item.price}</Text>
                </View>
                <View style={styles.orderItemDetails}>
                  <Text style={styles.orderItemQuantity}>
                    Quantity: {Math.round(item.quantity)}
                  </Text>
                  <Text style={styles.orderItemTotal}>
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${orderData?.sub_total}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${orderData?.tax}</Text>
            </View>
            {orderData?.delivery_fee > 0 && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>
                  ${orderData?.delivery_fee}
                </Text>
              </View>
            )}
            <View style={styles.separator} />
            <View style={styles.totalItem}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${orderData?.total}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.card}>
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>
                {orderData?.customer_details?.name}
              </Text>
              <View style={styles.cousterminfoicons}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/ios/50/mail.png',
                  }}
                  style={styles.iconsImage}></Image>
                <Text style={styles.customerDetail}>
                  {orderData?.customer_details?.email}
                </Text>
              </View>
              <View style={styles.cousterminfoicons}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/ios/50/phone.png',
                  }}
                  style={styles.iconsImage}></Image>
                <Text style={styles.customerDetail}>
                  {orderData?.customer_details?.mobile_no}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  scrollView: {
    flex: 1,
  },
  iconsImage: {
    height: 18,
    width: 18,
    marginRight: 8,
    tintColor: 'blue',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  orderId: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  orderStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  orderStatusText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  customerInfo: {
    gap: 4,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cousterminfoicons:{
    flexDirection: 'row', 
    alignItems: 'center',
  },
  customerDetail: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  orderItem: {
    paddingVertical: 12,
  },
  orderItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  orderItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  orderItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderItemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  orderItemTotal: {
    fontSize: 14,
    color: '#666',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 12,
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF',
  },
  errorMsgText: {
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
