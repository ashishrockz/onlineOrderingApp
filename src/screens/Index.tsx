import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import Orders from "../components/Order";
import Promotions from "../components/Promotions";

const Index = () => {
  const [currentTab, setCurrentTab] = useState("orders");

  return (
    <SafeAreaView style={styles.container}>
      <Header onLogoPress={() => setCurrentTab("orders")} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, currentTab === "orders" && styles.activeTab]}
          onPress={() => setCurrentTab("orders")}
        >
          <Text style={[styles.tabText, currentTab === "orders" && styles.activeTabText]}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, currentTab === "promotions" && styles.activeTab]}
          onPress={() => setCurrentTab("promotions")}
        >
          <Text style={[styles.tabText, currentTab === "promotions" && styles.activeTabText]}>
            Promotions
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {currentTab === "orders" ? <Orders /> : <Promotions />}
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "orange",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },
  activeTabText: {
    color: "orange",
  },
  contentContainer: {
    flex: 1,
  },
});
