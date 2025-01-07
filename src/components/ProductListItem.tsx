import { Text, View, StyleSheet, Image,Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { Product, Tables } from '@/types';
import { Link, useSegments } from 'expo-router';
//import { Product } from '../types';
// import products from '@/assets/data/products';

//import EditScreenInfo from '@/src/components/EditScreenInfo';

import RemoteImage from './RemoteImage';

export const defaultPizzaImage =
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductListItemProps ={
    // product: Product;
    product: Tables<'products'>;
};

// const product = products[0] // كل مرة تزيد هنا بيزيد بيأخذ من قائمة الابرودكتس الي تحتها 


const ProductListItem = ({ product }: ProductListItemProps) => {
  //  console.log(props);

  const segments = useSegments();
  // const currentSegment = segments[0] === 'admin' || segments[0] === 'user' ? segments[0] : 'user';
  // console.log(segments); 

    return (
      // <Link href={`/menu/${product.id}`} asChild>   // تشتغل معي بدون مشاكل 
      <Link href={segments[0] == '(admin)'? `/(admin)/menu/${product.id}`: `/(user)/menu/${product.id}`} asChild>
        <Pressable style={styles.container}>
      {/* <View style={styles.container}> */}
        <RemoteImage 
          path={product.image}
          fallback={defaultPizzaImage}
        //<Image source={{ uri: product.image || defaultPizzaImage}} 
          style={styles.image} 
          resizeMode='contain'
          />
        {/* <Text style={styles.title}>أرحبوا تراحيب المرباخ وقت المحل </Text> */}
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>

        {/* <Link href={'/product'}>Go to details</Link> */}
      {/* </View> */}
       </Pressable>
       </Link>
     
    )
  }
  
export default ProductListItem;


const styles = StyleSheet.create({
  /* container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, */

  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius:20,
    flex:1,
    // margin:10,
    maxWidth:'50%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },

  title: {fontSize:20, fontWeight:"bold", marginVertical: 10},
  price1: {fontSize:18, fontWeight:500},
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },



  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
