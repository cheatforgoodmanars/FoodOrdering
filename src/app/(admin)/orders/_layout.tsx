
import {  Stack } from 'expo-router';
// import CartScreen from '@/app/cart';

export default function MenuLayout() {
  return (
    <Stack  >
        {/* <Stack.Screen name='index' options={{title: 'Orders'}} /> */}
        <Stack.Screen name='list' options={{ headerShown: false }} />

        </Stack>
  )
};