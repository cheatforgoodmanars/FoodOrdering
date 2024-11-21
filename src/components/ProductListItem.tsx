import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { Product } from '@/types';
//import { Product } from '../types';
// import products from '@/assets/data/products';

//import EditScreenInfo from '@/src/components/EditScreenInfo';

export const defaultPizzaImage =
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductListItem ={
    product: Product
}

// const product = products[0] // كل مرة تزيد هنا بيزيد بيأخذ من قائمة الابرودكتس الي تحتها 

const ProductListItem = ({ product }: ProductListItem) => {
  //  console.log(props);
    return (
      <View style={styles.container}>
        <Image source={{ uri: product.image || defaultPizzaImage}} style={styles.image} 
          resizeMode='contain'
          ></Image>
        <Text style={styles.title}>أرحبوا تراحيب المرباخ وقت المحل </Text>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
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
