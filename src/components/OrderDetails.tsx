import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ApiUrlConstance, errorMessage, methods } from "../constance/constance";
import { useEffect, useState } from "react";
import { twelveHoursFormat } from "../hooks/helpers";

export default function OrderDetails({ route }: any) {
  const [viewOrderDetails, setViewOrderDetails] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getOrderIdDetails = async (id: number) => {
    try {
      const url = `${ApiUrlConstance?.chefgaApiUrl}/${ApiUrlConstance?.order}/${id}`;
      const response = await fetch(url, {
        method: methods?.get,
        headers: {
          Authorization: `${ApiUrlConstance?.bearer} eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MX0sImlhdCI6MTczODEyNTg4Mn0.CPD_pjsl__yHgZBNNAoEG6xMhQyb6cSZ41LQHyLH9s8`,
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
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    getOrderIdDetails(route.params.id);
  }, [route]);

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorMsgText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Order Details #{viewOrderDetails[0]?.id}</Text>
        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{viewOrderDetails?.[0]?.customer_details?.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{viewOrderDetails?.[0]?.customer_details?.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{viewOrderDetails?.[0]?.customer_details?.mobile_no}</Text>
        </View>

        <Text style={styles.sectionTitle}>Order Items</Text>
        {viewOrderDetails?.[0]?.CartItems.map((cartItem: any, index: number) => (
          <View key={index} style={styles.orderItemRow}>
            <Text style={styles.orderItemName}>{cartItem?.display_name} x {cartItem?.quantity}</Text>
            <Text style={styles.orderItemPrice}>${cartItem?.price}</Text>
          </View>
        ))}

        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>${viewOrderDetails?.[0]?.sub_total}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tax:</Text>
          <Text style={styles.value}>${viewOrderDetails?.[0]?.tax}</Text>
        </View>
        {viewOrderDetails[0]?.delivery_fee && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Delivery Fee:</Text>
            <Text style={styles.value}>${viewOrderDetails?.[0]?.delivery_fee}</Text>
          </View>
        )}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${viewOrderDetails?.[0]?.total}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: "#777",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  orderItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  orderItemName: {
    fontSize: 16,
    color: "#333",
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffefef",
  },
  errorMsgText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e74c3c",
    textAlign: "center",
  },
});
