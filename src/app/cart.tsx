import { View, Text, Platform ,FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
// import { useContext } from 'react';
// import { CartContext, useCart } from '@/providers/CartProvider'

import { useCart } from '@/providers/CartProvider'
// import { FlatList } from 'react-native-reanimated/lib/typescript/Animated'
import CartListItem from '@/components/CartListItem'

const CartScreen = () => {
  // const { items } = useContext(CartContext);
  const { items } = useCart();


  return (
    <View>
      {/* <Text>Cart items length: {items.length}</Text> */}

      <FlatList
          data={items}
          renderItem={({ item }) => <CartListItem cartItem={item}/>}
      />

    {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'android' ? 'light' : 'auto'} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen