import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Order } from '../types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import { Tables } from '@/database.types';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  // order: Order;
  order: Tables<'orders'>;

};

const OrderListItem = ({ order }: OrderListItemProps) => {
    const segments = useSegments();
    // console.log(segments);  // Log to inspect the segments array
  
    // Ensure segments[0] exists
    const firstSegment = segments[0] || 'default-segment';  // Fallback if the segment is missing
  
    return (
    //   <Link href={`/${firstSegment}/orders/${order.id}`} asChild>
    <Link href={`/orders/${order.id}`} asChild>
    {/* // <Link href={segments[0] == '(admin)'? `/(admin)/menu/${order.id}`: `/(user)/orders/${order.id}`} asChild> */}
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;