import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
const dummyData = {
    "user_id": 98765,
    "name": "Emily Johnson",
    "orders": [
      {
        "order_id": 2001,
        "dishes": [
          {
            "dish_name": "Margherita Pizza",
            "quantity": 1,
            "vegOrNonVeg": "Vegetarian"
          },
          {
            "dish_name": "Garlic Bread",
            "quantity": 2,
            "vegOrNonVeg": "Vegetarian"
          }
        ],
        "delivery_mode": "Dine-In",
        "amount_paid": 18.50,
        "order_date_time": "2025-01-06T12:45:00"
      },
      {
        "order_id": 2002,
        "dishes": [
          {
            "dish_name": "Grilled Chicken Salad",
            "quantity": 1,
            "vegOrNonVeg": "Non-Vegetarian"
          },
          {
            "dish_name": "Lemonade",
            "quantity": 1,
            "vegOrNonVeg": "Vegetarian"
          }
        ],
        "delivery_mode": "Takeaway",
        "amount_paid": 12.30,
        "order_date_time": "2025-01-05T19:30:00"
      },
      {
        "order_id": 2003,
        "dishes": [
          {
            "dish_name": "Spaghetti Bolognese",
            "quantity": 1,
            "vegOrNonVeg": "Non-Vegetarian"
          },
          {
            "dish_name": "Tiramisu",
            "quantity": 1,
            "vegOrNonVeg": "Vegetarian"
          }
        ],
        "delivery_mode": "Home Delivery",
        "amount_paid": 22.75,
        "order_date_time": "2025-01-04T13:15:00"
      },
      {
        "order_id": 2004,
        "dishes": [
          {
            "dish_name": "BBQ Chicken Wings",
            "quantity": 2,
            "vegOrNonVeg": "Non-Vegetarian"
          },
          {
            "dish_name": "French Fries",
            "quantity": 1,
            "vegOrNonVeg": "Vegetarian"
          },
          {
            "dish_name": "Coca-Cola",
            "quantity": 1,
            "vegOrNonVeg": "Vegetarian"
          }
        ],
        "delivery_mode": "Dine-In",
        "amount_paid": 16.40,
        "order_date_time": "2025-01-03T18:50:00"
      },
      {
        "order_id": 2005,
        "dishes": [
          {
            "dish_name": "Vegetable Curry",
            "quantity": 1,
            "vegOrNonVeg": "Vegetarian"
          },
          {
            "dish_name": "Steamed Rice",
            "quantity": 1,
            "vegOrNonVeg": "Vegetarian"
          },
          {
            "dish_name": "Mango Lassi",
            "quantity": 1,
            "vegOrNonVeg": "Vegetarian"
          }
        ],
        "delivery_mode": "Home Delivery",
        "amount_paid": 14.20,
        "order_date_time": "2025-01-02T20:25:00"
      }
    ]
  }
  
export default function RecentOrdersOfUsers(){
    return(
        <SafeAreaView style={styles.container}>
            <Text style={{fontWeight:"bold",fontSize:21,textAlign:"center"}}>Recent order of {dummyData.name}</Text>
            <ScrollView>
                {dummyData.orders.map((orderObj)=>(
                    <View style={{backgroundColor:"white",borderRadius:10,padding:10,marginTop:10,marginBottom:10}} key={orderObj.order_id}>
                        <Text style={{fontSize:18}}>#{orderObj.order_id}</Text>
                        <View style={{borderBottomWidth:1, borderBottomColor:"black"}}></View>
                        {orderObj.dishes.map((dish)=>(
                            <View key={dish.dish_name} style={{flexDirection:"row",alignItems:"center"}}>
                                {dish.vegOrNonVeg === "Vegetarian"?
                                <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/2048px-Veg_symbol.svg.png"}} style={{height:20,width:20,marginRight:10}}></Image>:
                                <Image source={{uri:"https://talksense.weebly.com/uploads/3/0/7/0/3070350/217581.jpg"}} style={{height:18,width:18,marginRight:10,marginLeft:2}}></Image>}
                                <Text>{dish.quantity} x</Text>
                                <Text style={{fontSize:17}}> {dish.dish_name}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: Dimensions.get("screen").width,
        padding: 10,
        backgroundColor: "#e6e6e6",

    }
})