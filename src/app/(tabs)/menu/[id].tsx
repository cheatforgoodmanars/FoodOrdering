import { View, Text } from 'react-native'
//import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();


  return (
    <View>
      <Stack.Screen options={{ title: 'Details ' + id}} />

      <Text style={{ fontSize:20 }}>ProductDetailsScreen for id: {id} </Text>
    </View>
  )
}

export default ProductDetailsScreen