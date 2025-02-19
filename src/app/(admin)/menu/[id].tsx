import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
//import React from 'react'
import { useLocalSearchParams, Stack, useRouter, Link } from 'expo-router'
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import {  useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';


const sizes: PizzaSize[] = ['S','M', 'L', 'XL'];

const ProductDetailsScreen = () => {
// const { id: } = useLocalSearchParams();
  const { id: idString } = useLocalSearchParams(); 
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error, isLoading } = useProduct(id);


  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  // const product = products.find((p) => p.id.toString() == id); 

  const router = useRouter();

  const addToCart = () => {
    // console.warn('adding to cart size', selectedSize);
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };
  


  // if (!product) {
  //   return <Text>Product not found</Text>
  // }

   if (isLoading) {
      return <ActivityIndicator />;
    }
  
    if (error) {
      return <Text>Faild to fetch products</Text>;
    }

  return (
    <View style={styles.container}>


      <Stack.Screen 
      // name='[id]' 
      options={{title: 'Menu', headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
         />


      <Stack.Screen options={{ title: product.name, headerTitleAlign: 'center' }} />
      {/* <Image source={{ uri: product.image || defaultPizzaImage}} style={ styles.image } /> */}

      <RemoteImage 
        // source={{ uri: product.image || defaultPizzaImage}} 
        path={product?.image}
        fallback={defaultPizzaImage}
        style={ styles.image } />

      
      <Text style={ styles.title}>${product.name} </Text>
      <Text style={ styles.price}>${product.price} </Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginTop: 'auto'
  },
  // sizes:{
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   marginVertical: 10,
  // },
  // size:{
  //   backgroundColor: 'gainsboro',
  //   width: 50,
  //   aspectRatio: 1,
  //   borderRadius: 25, // على يكون على شكل دائرة لازم يكون نص حجم ال width
  //   alignItems: 'center',
  //   justifyContent: 'center',
    
  // },
  // sizeText:{
  //   fontSize: 20,
  //   fontWeight:'500',
  // },
});

export default ProductDetailsScreen