import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem"
// import orders from "@assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useOrdersDetails } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscription";


export default function OrederDetailsScreen()  {
    // const {id} = useLocalSearchParams();
    const { id: idString } = useLocalSearchParams(); 
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

    const { data: order, isLoading, error } = useOrdersDetails(id);
    useUpdateOrderSubscription(id);

    

    // const order = orders.find((o) => o.id.toString() === id );

     if (isLoading) {
        return <ActivityIndicator />;
      }
    
      if (error) {
        return <Text>Faild to fetch products</Text>;
      }

    // if (!order) {
    //    return <Text>Not Found</Text>;
    // }

    // console.log(order); 

    return (
    <View style={{ padding: 10 , gap: 20, flex: 1}}>
        <Stack.Screen options={{ title: `Order #${id}` , headerTitleAlign: 'center'}} />
        {/* <Text>Oreder details: {id}</Text>; */}

        {/* <OrderListItem order={order}/>  // هذا اذا حطيته بيخليه ثابت والفلات لست ببتحرك   */}  

        <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order}/> }  // هذا اذا حطيته هنا بيتحرك مع الفلات لست
      />

    </View>
);
}