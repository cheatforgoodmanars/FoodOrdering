import { Text, FlatList, ActivityIndicator } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "@/api/orders";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderSubscription } from "@/api/orders/subscription";

export default function OrdersScreen() {
    const {data: orders, isLoading, error } = useAdminOrderList({ archived : false });

    // const queryClient = useQueryClient();

    // useEffect(() =>{
    //     const ordersSubscription = supabase
    //         .channel('custom-insert-channel')
    //         .on(
    //             'postgres_changes',
    //             { event: 'INSERT', schema: 'public', table: 'orders' },
    //             (payload) => {
    //                 console.log('Change received!', payload);
    //                 queryClient.invalidateQueries(['orders'])
    //             }
    //         )
    //         .subscribe()

    //         return () => {
    //             ordersSubscription.unsubscribe();
    //           };

    // }, [] );

    useInsertOrderSubscription(); // هذا يستدعي الكود الي فوق لكن من ملف السكسكريشن

    if (isLoading){
        return <ActivityIndicator />;
    }
    if(error) {
        return <Text>Faild to fetch</Text>
    }

    return (
    <FlatList data={orders}
     renderItem={({ item }) => <OrderListItem order={item} /> } 
     contentContainerStyle={{ gap: 10, padding: 10  }}
     />
     
    );
}
